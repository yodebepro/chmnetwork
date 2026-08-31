# CHM Network Direct Chat Platform

This package keeps your website layout locked, but changes the chatbot delivery method:

- Public visitor presses **Send**
- Message goes directly to the backend API
- Backend stores the chat session
- Backend sends SMS notification to **973-855-2396**
- SMS includes an admin link such as `/admin?chatSession=...`
- You open the link and continue from the admin side

## Important

A static HTML file alone cannot send SMS directly to your phone without opening the visitor's SMS app.  
Direct SMS requires a backend + SMS provider. This package includes the backend.

## Run locally

```bash
npm install
cp .env.example .env
npm start
```

Open:

```text
http://localhost:4200
```

## Deploy

Deploy this whole folder to Render, Railway, VPS, or any Node.js host.

Set these environment variables on the host:

```text
PUBLIC_SITE_URL=https://your-domain.com
ADMIN_PHONE=+19738552396
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_FROM_NUMBER=...
```

## Files

- `index.html` — locked website with direct chatbot send
- `server.js` — backend API + SMS notification
- `data/chat_sessions.json` — stored chat sessions
- `.env.example` — configuration example
