# AKEP — Developer Setup Guide

> For any developer or agent picking up this project for the first time.

---

## 1. Prerequisites

| Tool | Version | Check |
|---|---|---|
| Node.js | 18+ (24 recommended) | `node --version` |
| npm | 9+ | `npm --version` |
| Git | any | `git --version` |

---

## 2. Clone & Install

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/akep-landing.git
cd akep-landing

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

---

## 3. Environment Setup

The backend requires a `.env` file. **Never commit this file.**

```bash
# Copy the example file
cp server/.env.example server/.env
```

Then open `server/.env` and fill in the values:

```env
PORT=8787
NODE_ENV=development

ALLOWED_ORIGINS=http://localhost:5173

# SendGrid — get API key from: sendgrid.com → Settings → API Keys
SENDGRID_API_KEY=SG.your_key_here

# Optional: segment waitlist into a named list
SENDGRID_WAITLIST_LIST_ID=

# Must be a verified sender in SendGrid (Settings → Sender Authentication)
FROM_EMAIL=no-reply@akepapp.com

# Your inbox — receives plain-text notification on every submission
NOTIFY_TO=your@email.com

# Social links (used in email footers)
AKEP_LINKEDIN_URL=https://linkedin.com/company/akepapp
AKEP_TWITTER_URL=https://twitter.com/akepapp
SUPPORT_URL=https://akepapp.com/support
```

### SendGrid requirements
Before emails will send, you need:
1. A SendGrid account at [sendgrid.com](https://sendgrid.com)
2. An API key: **Settings → API Keys → Create API Key** (Full Access or Mail Send)
3. A verified sender: **Settings → Sender Authentication → Verify a Single Sender** (or domain auth)
4. The dynamic template must exist: `d-18167d93c27a43388e9a6112691b9492`
   - If using a fresh account, create a new template and update the ID in `server/src/index.js` → `sendWaitlistConfirmation()`

---

## 4. Running Locally

You need **two terminals** — one for the frontend, one for the backend.

### Terminal 1 — Frontend (Vite dev server)
```bash
npm run dev
# Starts at http://localhost:5173
```

### Terminal 2 — Backend (Express API)
```bash
cd server
node --watch src/index.js
# Starts at http://localhost:8787
# --watch restarts automatically on file changes
```

Or from the project root:
```bash
npm run dev:api
```

### Verify both are running
- Frontend: open `http://localhost:5173` in browser
- Backend: `curl http://localhost:8787/health` → `{"ok":true}`

---

## 5. Testing the Email System

### Quick terminal test (no browser needed)

**Waitlist submission:**
```powershell
# Windows PowerShell
Invoke-RestMethod -Uri "http://localhost:8787/api/waitlist" `
  -Method POST -ContentType "application/json" `
  -Body '{"name":"Test User","email":"your@email.com","institution":"Test University"}'
```

```bash
# Mac/Linux
curl -X POST http://localhost:8787/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"your@email.com","institution":"Test University"}'
```

Expected: `{"ok":true}` + confirmation email arrives in inbox

**Contact/demo submission:**
```powershell
Invoke-RestMethod -Uri "http://localhost:8787/api/contact" `
  -Method POST -ContentType "application/json" `
  -Body '{"name":"Test User","email":"your@email.com","institution":"Test Corp","subject":"Live Demo Request","message":"Test"}'
```

Expected: `{"ok":true}` + demo confirmation + admin notification arrive in inbox

**Invalid email (should be rejected):**
```powershell
Invoke-RestMethod -Uri "http://localhost:8787/api/waitlist" `
  -Method POST -ContentType "application/json" `
  -Body '{"email":"not-an-email"}'
```

Expected: 400 error — `"A valid email address is required."`

**Rate limit test:**
Send 4+ requests quickly — the 4th should return 429.

---

## 6. Project Scripts Reference

### Root (`package.json`)
| Script | Command | Description |
|---|---|---|
| `npm run dev` | `vite` | Start Vite frontend dev server |
| `npm run build` | `vite build` | Build frontend to `dist/` |
| `npm run dev:api` | `npm --prefix server run dev` | Start backend with file watching |
| `npm run start:api` | `npm --prefix server run start` | Start backend (production mode) |

### Server (`server/package.json`)
| Script | Command | Description |
|---|---|---|
| `npm start` | `node src/index.js` | Production start |
| `npm run dev` | `node --watch src/index.js` | Development with auto-restart |

---

## 7. Key Files Reference

| File | Purpose |
|---|---|
| `index.html` | HTML entry point — Playfair Display Google Fonts loaded here |
| `vite.config.js` | Vite config — Tailwind CSS plugin, React plugin |
| `src/main.jsx` | React root — mounts App into `#root` |
| `src/app/App.jsx` | Root component — assembles all sections + modal state |
| `src/app/lib/api.ts` | **All API calls** — edit this to change the backend URL or add new endpoints |
| `src/app/components/akep/AkepUI.tsx` | **Design tokens** — colors, shared components (AkepLogo, PrimaryButton, etc.) |
| `src/app/components/akep/AkepModal.tsx` | **Form logic** — handles both waitlist + demo form submissions |
| `server/src/index.js` | **Entire backend** — all routes, email functions, validation |
| `server/.env` | Secrets (gitignored — never commit) |
| `server/.env.example` | Safe template showing all required variables |
| `data/waitlist.jsonl` | Local backup of all waitlist submissions (one JSON per line) |

---

## 8. Making Common Changes

### Change the admin notification email
Edit `server/.env`:
```env
NOTIFY_TO=newadmin@yourdomain.com
```
Restart the server.

### Change the SendGrid dynamic template
Edit `server/src/index.js` → `sendWaitlistConfirmation()`:
```javascript
templateId: "d-your-new-template-id-here",
```

### Add a new field to the waitlist form
1. Add the input to `AkepModal.tsx` or `AkepWaitlist.tsx`
2. Add the field to `WaitlistPayload` type in `src/app/lib/api.ts`
3. Pass it in `submitWaitlist()` call in `AkepModal.tsx`
4. Add it to the destructure + sanitise block in `POST /api/waitlist` in `server/src/index.js`
5. Add it to the `appendToWaitlistLog()` call

### Change the colour palette
Edit `src/app/components/akep/AkepUI.tsx` — the `NAVY`, `GOLD`, `GOLD_LIGHT` constants are the source of truth. For components that define their own local constants (`AkepHero.tsx`, `AkepNav.tsx`), update those files individually.

---

## 9. Git Workflow

```bash
# Work on a feature
git checkout -b feature/my-change
# ... make changes ...
git add .
git commit -m "describe the change"
git push origin feature/my-change

# Merge to main (triggers auto-deploy)
git checkout main
git merge feature/my-change
git push origin main
```

**Main branch** = production. Every push to `main` auto-deploys via Amplify (frontend) and App Runner (backend).

---

## 10. Troubleshooting

| Problem | Likely cause | Fix |
|---|---|---|
| `EADDRINUSE: port 8787` | Old server still running | Kill it: `Stop-Process -Id (Get-NetTCPConnection -LocalPort 8787).OwningProcess -Force` |
| `400: A valid email address is required` | Email field empty or malformed | Pass a valid email in the request body |
| `429: Too many requests` | Rate limit hit | Wait 1 hour, or restart server (clears in-memory rate limit store) |
| Email not arriving | `NOTIFY_TO` inbox has no MX records | Change `NOTIFY_TO` to a Gmail or working inbox |
| Email deferred in SendGrid | Recipient domain has no MX records | Same as above |
| `CORS error` in browser | Origin not in `ALLOWED_ORIGINS` | Add `http://localhost:5173` to `ALLOWED_ORIGINS` in `.env` |
| SendGrid 403 Forbidden | API key invalid or expired | Regenerate key in SendGrid → Settings → API Keys |
| Template variables blank | Variable name mismatch | Check template uses `{{first_name}}` and `{{institution}}` exactly |
