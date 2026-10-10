# AKEP — Architecture & API Reference

---

## 1. Frontend Architecture

### Stack
| Technology | Version | Role |
|---|---|---|
| React | 18 | UI framework |
| Vite | 6 | Build tool + dev server |
| TypeScript | — | All component files (.tsx) |
| Tailwind CSS | v4 | Utility styling via `@tailwindcss/vite` plugin |
| Radix UI | — | Accessible headless UI primitives |
| Lucide React | — | Icons |
| Sonner | — | Toast notifications |

### File Structure
```
src/
├── main.jsx                    # React root mount
├── app/
│   ├── App.jsx                 # Root component — assembles all sections
│   ├── lib/
│   │   └── api.ts              # API client — all fetch calls go here
│   ├── components/
│   │   └── akep/               # All landing page section components
│   │       ├── AkepUI.tsx      # Design tokens + shared primitives (logo, buttons)
│   │       ├── AkepNav.tsx     # Sticky navigation
│   │       ├── AkepHero.tsx    # Hero section
│   │       ├── AkepModal.tsx   # Shared modal (waitlist + demo forms)
│   │       ├── AkepWaitlist.tsx
│   │       ├── AkepFeatures.tsx
│   │       ├── AkepHowItWorks.tsx
│   │       ├── AkepPricing.tsx
│   │       ├── AkepFooter.tsx
│   │       └── ...             # Other section components
│   └── styles/
│       ├── globals.css         # Tailwind base + global resets
│       └── index.css
└── styles/
    └── default_theme.css
```

### API Client — `src/app/lib/api.ts`

All communication with the backend goes through this single file. The base URL is configured via an environment variable so it works in both development and production without code changes.

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8787";

// Two exported functions:
submitWaitlist(payload: WaitlistPayload)  // POST /api/waitlist
submitContact(payload: ContactPayload)   // POST /api/contact
```

**WaitlistPayload fields:**
| Field | Type | Required |
|---|---|---|
| `email` | string | ✅ |
| `name` | string | optional |
| `institution` | string | optional |
| `role` | string | optional |
| `country` | string | optional |
| `source` | string | optional |
| `challenge` | string | optional |

**ContactPayload fields:**
| Field | Type | Required |
|---|---|---|
| `name` | string | ✅ |
| `email` | string | ✅ |
| `institution` | string | optional |
| `subject` | string | optional |
| `message` | string | optional |

### Modal Routing Logic (`AkepModal.tsx`)

The same `AkepModal` component handles both form types. It decides which API to call by inspecting the `title` or `subject` prop:

```typescript
const isWaitlist = /waitlist/i.test(title) || /waitlist/i.test(subject || '');
if (isWaitlist) {
  await submitWaitlist({ ... });
} else {
  await submitContact({ ... });
}
```

---

## 2. Backend Architecture

### Stack
| Technology | Version | Role |
|---|---|---|
| Node.js | 24+ | Runtime |
| Express | 4.21 | HTTP framework |
| `@sendgrid/mail` | 8.1.6 | Email sending |
| `express-rate-limit` | 8.5.2 | Rate limiting |
| `dotenv` | 16 | Environment variable loading |
| `cors` | 2.8 | Cross-origin request handling |

### File Structure
```
server/
├── package.json            # Dependencies + scripts
├── .env                    # Secrets (gitignored)
├── .env.example            # Template for env setup
└── src/
    └── index.js            # Entire server — single file
```

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `PORT` | No (default: 8787) | Port the server listens on |
| `SENDGRID_API_KEY` | ✅ | SendGrid API key (starts with `SG.`) |
| `FROM_EMAIL` | ✅ | Verified sender address in SendGrid |
| `NOTIFY_TO` | ✅ | Admin email — receives all submission notifications |
| `ALLOWED_ORIGINS` | No | Comma-separated CORS origins. Empty = allow all |
| `SENDGRID_WAITLIST_LIST_ID` | No | SendGrid contact list ID for segmentation |
| `AKEP_LINKEDIN_URL` | No | LinkedIn URL for email footers |
| `AKEP_TWITTER_URL` | No | Twitter/X URL for email footers |
| `SUPPORT_URL` | No | Support link in email footers |

---

## 3. API Endpoints

### `GET /health`
Health check. Returns `{ ok: true }`. Used by deployment platforms to confirm the server is alive.

```
Response 200: { "ok": true }
```

---

### `POST /api/waitlist`

Handles waitlist signup form submissions.

**Rate limit:** 3 requests per IP per hour

**Request body:**
```json
{
  "email": "user@university.edu",
  "name": "Dr. Jane Smith",
  "institution": "University of Ghana",
  "role": "Graduate Coordinator",
  "country": "Ghana",
  "source": "Google",
  "challenge": "We struggle with duplicate topics"
}
```

**Validation:**
- `email` must be a valid email address (RFC 5322 regex). All other fields are optional.

**On success — runs in parallel:**
1. Sends waitlist confirmation to the visitor via **SendGrid Dynamic Template** `d-18167d93c27a43388e9a6112691b9492`
2. Sends plain-text admin notification to `NOTIFY_TO`
3. Adds contact to SendGrid Marketing Contacts (non-fatal if fails)
4. Appends entry to `data/waitlist.jsonl` (non-fatal if fails)

**Responses:**
```
200: { "ok": true }
400: { "ok": false, "error": "A valid email address is required." }
429: { "ok": false, "error": "Too many requests — please try again later." }
500: { "ok": false, "error": "Failed to submit waitlist request" }
```

---

### `POST /api/contact`

Handles "Request a Live Demo" form submissions.

**Rate limit:** 5 requests per IP per hour

**Request body:**
```json
{
  "name": "Dr. Jane Smith",
  "email": "user@university.edu",
  "institution": "IMOTECH Solutions",
  "subject": "Live Demo Request",
  "message": "We'd like to see a personalised demo"
}
```

**Validation:**
- `name` must be non-empty
- `email` must be a valid email address

**On success — runs in parallel:**
1. Sends demo confirmation HTML email to the visitor
2. Sends plain-text admin notification to `NOTIFY_TO`

**Responses:**
```
200: { "ok": true }
400: { "ok": false, "error": "Name and a valid email are required." }
429: { "ok": false, "error": "Too many requests — please try again later." }
500: { "ok": false, "error": "Failed to send contact request" }
```

---

## 4. Security Implementation

### Input Validation
```javascript
// Email validation — RFC 5322 simplified
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]+\.[^\s@]{2,}$/;
function validEmail(value) {
  return typeof value === "string" && EMAIL_RE.test(value.trim());
}

// HTML injection prevention — strips all tags
function sanitise(value, maxLen = 200) {
  return value.replace(/<[^>]*>/g, "").trim().slice(0, maxLen);
}
```

### Field length caps
| Field | Max Length |
|---|---|
| name, institution, role, country, source | 200 characters |
| challenge, message | 1000–2000 characters |
| JSON body | 64 KB |

### Rate Limiting
```javascript
// Waitlist: 3 per IP per hour
const waitlistLimiter = rateLimit({ windowMs: 3600000, max: 3 });

// Contact: 5 per IP per hour
const contactLimiter  = rateLimit({ windowMs: 3600000, max: 5 });
```

### CORS
Origins are whitelisted via `ALLOWED_ORIGINS` env var. In development, if `ALLOWED_ORIGINS` is empty, all origins are allowed. In production, set it to your exact domain(s):
```
ALLOWED_ORIGINS=https://akepapp.com,https://www.akepapp.com
```

---

## 5. Data Flow — Waitlist Submission (End to End)

```
1. Visitor fills in AkepWaitlist or AkepModal form
2. React calls submitWaitlist() in src/app/lib/api.ts
3. fetch() POSTs JSON to http://localhost:8787/api/waitlist
4. Express receives request
5. waitlistLimiter checks IP rate (rejects if > 3/hr)
6. validEmail() validates email format
7. sanitise() cleans all string fields
8. Promise.all() fires in parallel:
   a. sgMail.send() with templateId → SendGrid → visitor inbox
   b. sgMail.send() plain text → admin inbox (NOTIFY_TO)
   c. fetch() PUT to SendGrid Contacts API
9. appendFileSync() writes to data/waitlist.jsonl
10. res.json({ ok: true }) returned to browser
11. Browser shows toast: "Thanks — we'll reach out within 24h"
```
