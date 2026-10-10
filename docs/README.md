# AKEP Landing Page — Documentation Index

> Last updated: May 2026

---

## Documents

| # | File | Contents |
|---|---|---|
| 1 | [01-system-overview.md](./01-system-overview.md) | What AKEP is, high-level diagram, design system, what has been built |
| 2 | [02-architecture-and-api.md](./02-architecture-and-api.md) | Frontend + backend stack, full API reference, security implementation, data flow |
| 3 | [03-email-system.md](./03-email-system.md) | SendGrid setup, all 3 email types, dynamic template variables, data storage |
| 4 | [04-deployment-guide.md](./04-deployment-guide.md) | AWS Amplify + App Runner step-by-step, auto-deploy, custom domain, cost |
| 5 | [05-developer-setup.md](./05-developer-setup.md) | Local setup, running dev servers, testing, key files, troubleshooting |

---

## Quick Reference

### Start dev environment
```bash
npm run dev          # Frontend → http://localhost:5173
npm run dev:api      # Backend  → http://localhost:8787
```

### Test the API
```powershell
# Waitlist
Invoke-RestMethod -Uri "http://localhost:8787/api/waitlist" -Method POST -ContentType "application/json" -Body '{"name":"Test","email":"you@email.com","institution":"Test University"}'

# Contact/Demo
Invoke-RestMethod -Uri "http://localhost:8787/api/contact" -Method POST -ContentType "application/json" -Body '{"name":"Test","email":"you@email.com","institution":"Test Corp","subject":"Live Demo Request"}'
```

### Key environment variables
```env
SENDGRID_API_KEY     # SendGrid API key
FROM_EMAIL           # no-reply@akepapp.com (verified sender)
NOTIFY_TO            # Your inbox for admin notifications
ALLOWED_ORIGINS      # CORS whitelist (comma-separated)
VITE_API_BASE_URL    # Backend URL (frontend env var)
```

### SendGrid Dynamic Template
- **Template ID:** `d-18167d93c27a43388e9a6112691b9492`
- **Variables used:** `{{first_name}}`, `{{institution}}`
- **Where set:** `server/src/index.js` → `sendWaitlistConfirmation()`

### Deploy
Push to `main` → Amplify + App Runner auto-deploy within ~2 min.
