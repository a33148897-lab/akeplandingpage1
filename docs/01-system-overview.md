# AKEP Landing Page — System Overview

> **Project:** AKEP — Academic Research & Dissertation Management Platform  
> **Domain:** akepapp.com  
> **Last updated:** May 2026  
> **Status:** Production-ready, pre-deployment

---

## 1. What is AKEP?

AKEP is a SaaS platform built for universities to manage the full lifecycle of student dissertations and academic research. It provides AI-powered duplicate detection, intelligent supervisor matching, and one-click accreditation reporting.

This repository is the **public marketing landing page** — not the main application. Its job is to:
- Present the product to universities and academic administrators
- Capture waitlist signups from interested institutions
- Handle demo requests
- Send branded confirmation emails via SendGrid

---

## 2. High-Level System Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        VISITOR'S BROWSER                        │
│                                                                 │
│   React SPA (Vite)  ──────────────►  Landing page UI           │
│         │                                                       │
│         │  form submit (fetch POST)                             │
│         ▼                                                       │
│   src/app/lib/api.ts                                            │
└───────────────────┬─────────────────────────────────────────────┘
                    │ HTTP POST JSON
                    ▼
┌─────────────────────────────────────────────────────────────────┐
│              EXPRESS API SERVER (port 8787)                     │
│              server/src/index.js                                │
│                                                                 │
│   /api/waitlist ──► validate ──► SendGrid Template Email        │
│                              ──► Admin notification email       │
│                              ──► SendGrid Contacts (marketing)  │
│                              ──► data/waitlist.jsonl (backup)   │
│                                                                 │
│   /api/contact  ──► validate ──► SendGrid HTML Demo Email       │
│                              ──► Admin notification email       │
└─────────────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                       SENDGRID                                  │
│                                                                 │
│   Dynamic Template (d-18167d93c27a43388e9a6112691b9492)        │
│   ── Waitlist confirmation → visitor's inbox                    │
│   ── Demo confirmation     → visitor's inbox (custom HTML)      │
│   ── Admin notifications   → NOTIFY_TO inbox (plain text)      │
│   ── Marketing Contacts    → SendGrid CRM dashboard            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. The Two Applications

| | Frontend | Backend |
|---|---|---|
| **Location** | `src/` | `server/` |
| **Framework** | React 18 + Vite 6 | Express.js 4 |
| **Language** | TypeScript (.tsx) | JavaScript (ES Modules) |
| **Entry point** | `src/main.jsx` → `App.jsx` | `server/src/index.js` |
| **Port (dev)** | 5173 | 8787 |
| **Build output** | `dist/` (static files) | N/A (runs as Node.js process) |
| **Start command** | `npm run dev` | `cd server && node src/index.js` |

---

## 4. Design System

| Token | Value | Usage |
|---|---|---|
| `NAVY` | `#0D1B3E` | Navigation, hero background, headers |
| `GOLD` | `#F59E0B` | CTA buttons, accent lines, icons |
| `GOLD_LIGHT` | `#FCD34D` | Hover states, decorative accents |
| Font (headings) | Playfair Display (Georgia serif) | Hero headline, section titles |
| Font (body) | Inter / Arial | Body text, UI elements |

Google Fonts are loaded via `<link>` preconnect in `index.html`.

---

## 5. Key Pages / Sections (in render order)

All sections live in `src/app/components/akep/`:

| Component | Section | Notes |
|---|---|---|
| `AkepNav.tsx` | Sticky navigation | Navy bg, gold CTA, white logo |
| `AkepHero.tsx` | Hero / above the fold | Dark navy gradient, Playfair Display headline |
| `AkepLogoCloud.tsx` | Partner universities | Gradient bridge from dark hero → white |
| `AkepFeatures.tsx` | Platform features | — |
| `AkepHowItWorks.tsx` | How it works | — |
| `AkepDemoShowcase.tsx` | Animated demo | — |
| `AkepUseCases.tsx` | Use cases | — |
| `AkepPricing.tsx` | Pricing tiers | — |
| `AkepTeam.tsx` | Team section | — |
| `AkepWaitlist.tsx` | Waitlist CTA | Triggers `AkepModal` |
| `AkepFooter.tsx` | Footer | — |
| `AkepModal.tsx` | Modal form | Shared: handles both waitlist + demo requests |

---

## 6. What Has Been Built / Changed

### Visual Design
- Hero redesigned: dark navy academic aesthetic with Playfair Display serif headline
- Navigation: solid navy background, gold CTA button, white AKEP wordmark
- Logo (`AkepUI.tsx`): navy rounded box + gold "A" lettermark + serif wordmark
- Section transitions: gradient bridge in `AkepLogoCloud.tsx` (dark hero → white section)
- Google Fonts integrated: Playfair Display 600/700 + italic 600, Inter 400/500/600

### Email Infrastructure
- **Replaced** nodemailer with `@sendgrid/mail`
- Waitlist confirmation uses **SendGrid Dynamic Template** `d-18167d93c27a43388e9a6112691b9492`
- Demo/contact confirmation uses custom HTML built in `buildDemoEmail()`
- Admin notifications (plain text) sent to `NOTIFY_TO` on every submission
- All visitor data saved to **SendGrid Marketing Contacts** + local `data/waitlist.jsonl`

### Security Hardening
- Rate limiting: 3 req/hr/IP on waitlist, 5 req/hr/IP on contact
- Email format validation (RFC 5322 regex)
- HTML tag stripping on all free-text fields
- JSON body limit capped at 64 KB
- CORS origin whitelist via `ALLOWED_ORIGINS` env var
- `.env` gitignored — secrets never committed

---

## 7. What Is NOT in This Repo

- The main AKEP application (separate codebase)
- User authentication
- Database
- Dissertation management features
- Admin dashboard

---

## 8. Current Status

| Item | Status |
|---|---|
| Landing page UI | ✅ Complete |
| Email system (SendGrid) | ✅ Complete & tested |
| Security hardening | ✅ Complete |
| Local data backup | ✅ Complete |
| SendGrid domain authentication | ✅ Done (akepapp.com) |
| MX records for info@akepapp.com | ⚠️ Not yet set up |
| Deployment to AWS | 🔄 Planned (next step) |
| Custom domain live | 🔄 Pending deployment |
