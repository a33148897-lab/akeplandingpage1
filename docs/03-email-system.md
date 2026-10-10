# AKEP — Email System Documentation

---

## 1. Overview

All emails are sent through **Twilio SendGrid**. There are three distinct email types in the system:

| Email | Trigger | Recipient | Type |
|---|---|---|---|
| Waitlist confirmation | `POST /api/waitlist` | Visitor who signed up | SendGrid Dynamic Template |
| Demo confirmation | `POST /api/contact` | Visitor who requested demo | Custom HTML (built in code) |
| Admin notification | Both routes | `NOTIFY_TO` address (you) | Plain text |

---

## 2. SendGrid Account Setup

### Sender Authentication
- Domain: `akepapp.com` — **authenticated** ✅
- This means emails show "from no-reply@akepapp.com" without "via sendgrid.net"
- DKIM and SPF records are in place — emails pass spam filters

### Sender address
- `FROM_EMAIL=no-reply@akepapp.com` — verified single sender
- Display name: **"AKEP Team"** (confirmation emails) / **"AKEP System"** (admin notifications)

### What is NOT set up yet
- MX records for `akepapp.com` — `info@akepapp.com` cannot receive email yet
- Until MX records are configured with an email hosting provider, keep `NOTIFY_TO` pointing to a working Gmail or other inbox

---

## 3. Email 1 — Waitlist Confirmation (Dynamic Template)

### Template details
| Property | Value |
|---|---|
| Template ID | `d-18167d93c27a43388e9a6112691b9492` |
| Template name | Waiting List (ACTIVE) |
| Editor | Code editor |
| Last edited | May 19, 2026 |

### Dynamic variables the template uses
| Variable | Example value | Source |
|---|---|---|
| `{{first_name}}` | `Abdulai` | Extracted from submitted `name` field |
| `{{institution}}` | `University of Ghana` | Submitted `institution` field |

### How variables are populated (server/src/index.js)
```javascript
const firstName = hasName ? name.trim().split(" ")[0] : "";

await sgMail.send({
  to,
  from: { name: "AKEP Team", email: from },
  templateId: "d-18167d93c27a43388e9a6112691b9492",
  dynamicTemplateData: {
    first_name:  firstName,
    institution: hasInstitution ? institution.trim() : "",
  },
});
```

### Template content summary
- Navy header with AKEP logo (gold A lettermark + wordmark)
- Gold accent line
- Graduation cap icon
- Headline: "You're officially on the list"
- Greeting: "Hi **{{first_name}}** — your spot from **{{institution}}** is confirmed."
- Gold callout box: "6 months University-tier access free"
- Feature list: AI duplicate detection, supervisor matching, accreditation reporting
- LinkedIn + X social buttons
- Footer with support links

### Subject line
Set inside the SendGrid template editor — not overridden by code.

---

## 4. Email 2 — Demo Confirmation (Custom HTML)

### When it fires
Every `POST /api/contact` submission (the "Request a Live Demo" modal form).

### Built in code
Function: `buildDemoEmail({ name, institution })` in `server/src/index.js`

### Subject line (generated dynamically)
```javascript
const subject = hasInstitution
  ? `${institution.trim()} — your AKEP demo request is confirmed`
  : "Your AKEP demo request is confirmed — we'll be in touch within 24h";
```

### Content summary
- Same navy/gold header as waitlist template
- Calendar icon
- Headline: "Demo request received"
- Institution badge (blue, shown only when institution provided)
- Gold callout: "30-minute live walkthrough" of AKEP
- Feature checklist: duplicate detection, supervisor matching, accreditation exports
- LinkedIn + X social buttons
- Footer

### URLs in the email
Pulled from environment variables:
```
AKEP_LINKEDIN_URL=https://linkedin.com/company/akepapp
AKEP_TWITTER_URL=https://twitter.com/akepapp
SUPPORT_URL=https://akepapp.com/support
```

---

## 5. Email 3 — Admin Notification (Plain Text)

### When it fires
On every submission to both `/api/waitlist` and `/api/contact`.

### Recipient
`NOTIFY_TO` environment variable. Currently: `atlebbie@gmail.com`

### Purpose
Instant alert so you know when someone has signed up or requested a demo. Allows manual follow-up.

### Waitlist notification format
```
Subject: [AKEP Waitlist] University of Ghana

New waitlist submission

Name:        Abdulai Tamba Lebbie
Email:       atlebbie@gmail.com
Institution: University of Ghana
Role:        -
Country:     -
Source:      -
Challenge:   -

Submitted at: 2026-05-19T03:27:06.391Z
```

### Contact notification format
```
Subject: [AKEP Contact] Live Demo Request

New contact/demo submission

Name:        Abdulai Tamba Lebbie
Email:       atlebbie@gmail.com
Institution: IMOTECH Solutions
Subject:     Live Demo Request
Message:     I would like a demo

Submitted at: 2026-05-19T10:41:06.184Z
```

---

## 6. Data Storage

### A — SendGrid Marketing Contacts (cloud)

Every waitlist submission is added to your SendGrid contact list via the Marketing Contacts API:

```javascript
await fetch("https://api.sendgrid.com/v3/marketing/contacts", {
  method: "PUT",
  headers: { Authorization: `Bearer ${SENDGRID_API_KEY}` },
  body: JSON.stringify({
    contacts: [{ email, first_name, last_name }],
    list_ids: [SENDGRID_WAITLIST_LIST_ID],  // optional
  }),
});
```

**Where to view:** SendGrid dashboard → Marketing → Contacts

**Use case:** Export CSV of all signups, send launch announcement campaigns.

**Optional segmentation:** Set `SENDGRID_WAITLIST_LIST_ID` in `.env` to bucket signups into a named list. Create the list in SendGrid → Marketing → Contacts → Lists.

### B — Local JSONL Backup

Every waitlist submission is also appended to `data/waitlist.jsonl` (project root) as a safety net.

**Format:** One JSON object per line
```json
{"name":"Abdulai Tamba Lebbie","email":"atlebbie@gmail.com","institution":"University of Ghana","role":null,"country":null,"source":null,"challenge":null,"ts":"2026-05-19T03:27:06.391Z"}
```

**Important:** This file is on the server machine. In production (App Runner / Elastic Beanstalk), the file will reset when the container restarts. For persistent backups in production, consider writing to S3 instead.

---

## 7. Error Handling Strategy

| Operation | Failure behaviour |
|---|---|
| SendGrid template email | Returns 500 to client — critical failure |
| Admin notification | Returns 500 to client — critical failure |
| SendGrid Contacts API | **Non-fatal** — error logged, response still 200 |
| JSONL file write | **Non-fatal** — error logged, response still 200 |

The contacts API and file backup are best-effort. The user always gets a response even if those fail.

---

## 8. Adding a New Email Type

To add a third email type (e.g. a "password reset" or "launch announcement"):

1. Write a `buildXyzEmail({ ... })` function returning an HTML string
2. Write a `sendXyzEmail({ to, ... })` async function calling `sgMail.send()`
3. Add a new Express route or extend an existing one
4. Add rate limiting if it's a user-triggered endpoint
