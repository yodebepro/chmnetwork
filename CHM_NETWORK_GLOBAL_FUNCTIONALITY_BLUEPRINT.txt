CHM NETWORK — COMPLETE GLOBAL FUNCTIONALITY & PERFORMANCE BLUEPRINT

This document is added to the website package as the complete technology stack, global functionality plan, and performance checklist.

CURRENT BASELINE TO PRESERVE
- Public Admin button removed
- Admin access by URL only
- Store section preserved
- Radio player preserved
- YODEBEPRO TV player preserved
- 11-channel TV layout preserved
- Left-side channel selector preserved
- Channel badge display preserved
- JSON publishing system preserved
- Contact/message system preserved
- Mobile-responsive layout preserved
- GitHub Pages compatible structure preserved

RECOMMENDED GLOBAL STACK
- Frontend: HTML, CSS, JavaScript
- Hosting: GitHub Pages, Netlify, or Cloudflare Pages
- Domain: chmnetwork.com
- Media hosting: YouTube, Vimeo, Facebook Live, MP4 links, HLS/M3U8 links
- Database future option: Supabase
- Storage future option: Supabase Storage / Firebase Storage / Cloudflare R2
- Payments: Stripe and PayPal
- Analytics: Google Analytics plus internal admin analytics
- Contact: FormSubmit now, backend API later
- Chat/SMS future option: Twilio + backend

ROOT GLOBAL FILES
- index.html
- admin.html
- login.html
- 404.html
- CNAME
- .nojekyll
- published_tv_channels.json
- published_videos.json
- published_music.json
- published_radio.json
- published_store.json
- published_tv_settings.json

TV CHANNEL REQUIREMENTS
Each of the 11 channels should support:
- Channel name
- Source type
- Source URL
- Title
- Description
- Thumbnail
- Active/inactive status
- Empty channel fallback
- Manual play only
- Top-right channel badge
- Bottom-center channel label
- Admin source control

SUPPORTED TV SOURCES
- YouTube
- YouTube Live
- Vimeo
- Facebook video/live
- Instagram embed
- iframe embed
- MP4
- HLS/M3U8

RADIO REQUIREMENTS
- Now Playing
- Live indicator
- Radio schedule
- Share button
- Mobile mini-player
- Prayer request button
- Radio metadata
- Listener counter future option
- Radio autoplay only if browser allows

STORE REQUIREMENTS
- Categories
- Search/filter
- Product cards
- Checkout link per item
- Stripe/PayPal future integration
- Digital download product support
- Admin product manager
- Global published_store.json support
- Future database sync

ADMIN PANEL REQUIREMENTS
- Dashboard scroll
- Videos / TV Source Manager
- Radio manager
- Store manager
- Schedule manager
- Contact/message inbox
- Analytics
- Global JSON export/import
- Publish buttons
- Admin-only controls hidden from public

PERFORMANCE REQUIREMENTS
- Lazy loading images
- Compressed images
- Minified CSS/JS in final production
- Cache-busting for JSON
- No autoplay conflict between TV and radio
- Keep JSON small
- Use external links for large MP4/MP3
- Mobile testing
- Accessibility labels
- CDN for heavy media

SECURITY REQUIREMENTS
- Public Admin button hidden
- Admin URL route only
- Strong password
- No private keys in public HTML
- Backend required for real protected admin later
- HTTPS enabled
- CNAME correct
- .nojekyll included
- 404 redirect fallback

FUTURE AUTOMATION
Recommended next step:
- Supabase database
- Tables:
  - tv_channels
  - video_playlist
  - radio_settings
  - store_products
  - contact_messages
  - chat_sessions
  - analytics_events
  - admin_users

FUTURE MOBILE APP / PWA
- manifest.json
- service-worker.js
- install button
- app icons
- offline fallback
- push notifications later

LOW-COST PATH
- GitHub Pages: free
- FormSubmit: free/basic
- YouTube/Vimeo/Facebook links: low cost/free
- Supabase free plan first
- Stripe/PayPal only charge transaction fees

DEPLOYMENT TEST LINKS
- https://chmnetwork.com/
- https://chmnetwork.com/admin.html
- https://chmnetwork.com/login.html
- https://chmnetwork.com/index.html?admin=1

END OF BLUEPRINT
