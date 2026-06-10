
/**
 * CHM Network Direct Chat Backend
 * Sends direct SMS notification to admin phone 973-855-2396 without opening visitor SMS/email apps.
 *
 * Run:
 *   npm install
 *   cp .env.example .env
 *   # Fill Twilio values in .env
 *   npm start
 *
 * Open:
 *   http://localhost:4200
 */

const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4200;
const ADMIN_PHONE = process.env.ADMIN_PHONE || "+19738552396";
const PUBLIC_SITE_URL = process.env.PUBLIC_SITE_URL || `http://localhost:${PORT}`;

app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.static(__dirname));

const dataDir = path.join(__dirname, "data");
const chatFile = path.join(dataDir, "chat_sessions.json");

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(chatFile)) fs.writeFileSync(chatFile, JSON.stringify({ sessions: [] }, null, 2));

function readStore() {
  try {
    return JSON.parse(fs.readFileSync(chatFile, "utf8"));
  } catch {
    return { sessions: [] };
  }
}

function writeStore(store) {
  fs.writeFileSync(chatFile, JSON.stringify(store, null, 2));
}

function getAdminChatLink(sessionId) {
  const separator = PUBLIC_SITE_URL.includes("?") ? "&" : "?";
  return `${PUBLIC_SITE_URL}${separator}admin=1&chatSession=${encodeURIComponent(sessionId)}`;
}

async function sendSmsNotification({ sessionId, message }) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;

  if (!sid || !token || !from) {
    console.log("SMS not sent: Twilio environment variables are not configured.");
    return { sent: false, reason: "Twilio not configured" };
  }

  const client = require("twilio")(sid, token);
  const adminLink = getAdminChatLink(sessionId);

  const body =
    `CHM Network live chat message:\n` +
    `"${String(message).slice(0, 240)}"\n\n` +
    `Open admin chat:\n${adminLink}`;

  const result = await client.messages.create({
    body,
    from,
    to: ADMIN_PHONE
  });

  return { sent: true, sid: result.sid };
}

app.post("/api/chat/message", async (req, res) => {
  try {
    const { sessionId, message, pageUrl, userAgent, sentAt } = req.body || {};
    if (!sessionId || !message || !String(message).trim()) {
      return res.status(400).json({ ok: false, error: "Missing sessionId or message" });
    }

    const store = readStore();
    let session = store.sessions.find(s => s.sessionId === sessionId);

    if (!session) {
      session = {
        sessionId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        pageUrl: pageUrl || "",
        userAgent: userAgent || "",
        adminLink: getAdminChatLink(sessionId),
        messages: []
      };
      store.sessions.unshift(session);
    }

    session.updatedAt = new Date().toISOString();
    session.messages.push({
      role: "visitor",
      message: String(message).trim(),
      sentAt: sentAt || new Date().toISOString()
    });

    writeStore(store);

    let sms = { sent: false };
    try {
      sms = await sendSmsNotification({ sessionId, message });
    } catch (smsError) {
      console.error("SMS error:", smsError.message);
      sms = { sent: false, error: smsError.message };
    }

    res.json({
      ok: true,
      sessionId,
      adminLink: session.adminLink,
      sms
    });
  } catch (error) {
    console.error("Chat message error:", error);
    res.status(500).json({ ok: false, error: "Server error" });
  }
});

app.get("/api/chat/sessions", (req, res) => {
  const store = readStore();
  res.json({ ok: true, sessions: store.sessions });
});

app.get("/api/chat/session/:sessionId", (req, res) => {
  const store = readStore();
  const session = store.sessions.find(s => s.sessionId === req.params.sessionId);
  if (!session) return res.status(404).json({ ok: false, error: "Session not found" });
  res.json({ ok: true, session });
});

app.post("/api/chat/reply", (req, res) => {
  const { sessionId, message } = req.body || {};
  if (!sessionId || !message || !String(message).trim()) {
    return res.status(400).json({ ok: false, error: "Missing sessionId or message" });
  }

  const store = readStore();
  const session = store.sessions.find(s => s.sessionId === sessionId);
  if (!session) return res.status(404).json({ ok: false, error: "Session not found" });

  session.updatedAt = new Date().toISOString();
  session.messages.push({
    role: "admin",
    message: String(message).trim(),
    sentAt: new Date().toISOString()
  });

  writeStore(store);
  res.json({ ok: true, session });
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`CHM Network Direct Chat running at http://localhost:${PORT}`);
  console.log(`Admin phone: ${ADMIN_PHONE}`);
});
