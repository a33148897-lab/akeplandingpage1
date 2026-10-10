import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { appendFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "../../data");
const WAITLIST_LOG = join(DATA_DIR, "waitlist.jsonl");

const app = express();

const PORT = Number(process.env.PORT || 8787);
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(express.json({ limit: "64kb" })); // keep payload small
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || ALLOWED_ORIGINS.length === 0 || ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Origin not allowed by CORS"));
    },
  }),
);

/** Send an email through the Resend REST API */
async function sendEmail({ to, fromName, subject, html, text }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY || ""}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${fromName} <${getFromEmail()}>`,
      to: [to],
      subject,
      ...(html ? { html } : {}),
      ...(text ? { text } : {}),
    }),
  });
  if (!res.ok) {
    throw new Error(`Resend API ${res.status}: ${await res.text()}`);
  }
}

// ── Rate limiters ─────────────────────────────────────────────────────────────
// Azure's proxy appends the client port to X-Forwarded-For (e.g. 1.2.3.4:5678)
function clientIp(req) {
  const forwarded = (req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  const raw = forwarded || req.socket.remoteAddress || "unknown";
  return raw.replace(/^(\d{1,3}(?:\.\d{1,3}){3}):\d+$/, "$1").replace(/^\[(.+)\]:\d+$/, "$1");
}

// Waitlist: max 3 submissions per IP per hour
const waitlistLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  validate: false,
  keyGenerator: clientIp,
  message: { ok: false, error: "Too many requests — please try again later." },
});

// Contact/demo: max 5 per IP per hour
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  validate: false,
  keyGenerator: clientIp,
  message: { ok: false, error: "Too many requests — please try again later." },
});

function required(value) {
  return typeof value === "string" && value.trim().length > 0;
}

/** Validate email format (RFC 5322 simplified) */
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]+\.[^\s@]{2,}$/;
function validEmail(value) {
  return typeof value === "string" && EMAIL_RE.test(value.trim());
}

/** Strip any HTML tags / trim to prevent injection in plain-text admin emails */
function sanitise(value, maxLen = 200) {
  if (typeof value !== "string") return "";
  return value.replace(/<[^>]*>/g, "").trim().slice(0, maxLen);
}

function getNotifyTo() {
  return process.env.NOTIFY_TO || "info@akepapp.com";
}

function getFromEmail() {
  return process.env.FROM_EMAIL || "no-reply@akepapp.com";
}

/** Internal admin notification — plain text */
async function sendAdminNotification({ subject, body }) {
  await sendEmail({ to: getNotifyTo(), fromName: "AKEP System", subject, text: body });
}

/** Waitlist confirmation email HTML */
function buildWaitlistEmail({ name, institution }) {
  const hasName = typeof name === "string" && name.trim().length > 0;
  const hasInstitution = typeof institution === "string" && institution.trim().length > 0;
  const firstName = hasName ? name.trim().split(" ")[0] : null;
  const institutionDisplay = hasInstitution ? institution.trim() : "your institution";
  // Greeting adapts to available data:
  // "Hi Dr. Hassan" | "Hi University of Ghana team" | "Hi there"
  const greeting = firstName || (hasInstitution ? `${institutionDisplay} team` : "there");
  const linkedinUrl =
    process.env.AKEP_LINKEDIN_URL || "https://linkedin.com/company/akepacademics";
  const twitterUrl = process.env.AKEP_TWITTER_URL || "https://twitter.com/akepacademics";
  const supportUrl = process.env.SUPPORT_URL || "mailto:support@akepapp.com";
  const year = new Date().getFullYear();

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>You're on the AKEP waitlist</title>
</head>
<body style="margin:0; padding:0; background-color:#eef0f5; font-family:Arial, Helvetica, sans-serif;">

  <!-- Preheader (hidden preview text) -->
  <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent; font-size:1px; line-height:1px; mso-hide:all;">
    ${hasInstitution ? `${institutionDisplay}'s` : 'Your'} AKEP waitlist spot is confirmed. 6 months free at launch — see what's coming.
  </div>

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#eef0f5;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- Email card -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 8px 32px rgba(13,27,62,0.12);">

          <!-- ── HEADER ─────────────────────────────────────── -->
          <tr>
            <td style="padding:22px 32px; background:#0D1B3E;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <!-- Logo mark + wordmark -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="width:34px; height:34px; border:1.5px solid rgba(245,158,11,0.55); border-radius:8px; text-align:center; vertical-align:middle; background:#0D1B3E;">
                          <span style="color:#F59E0B; font-family:Georgia,'Times New Roman',serif; font-size:17px; font-weight:700; line-height:1; display:block; padding-top:6px;">A</span>
                        </td>
                        <td style="padding-left:10px; vertical-align:middle;">
                          <span style="color:#ffffff; font-family:Georgia,'Times New Roman',serif; font-size:19px; font-weight:700; letter-spacing:0.06em;">AKEP</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <span style="color:rgba(245,158,11,0.65); font-family:Arial,sans-serif; font-size:10px; letter-spacing:0.10em; text-transform:uppercase;">Academic Platform</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Gold accent line -->
          <tr>
            <td style="height:3px; background:#F59E0B; font-size:0; line-height:0;">&nbsp;</td>
          </tr>

          <!-- ── BODY ───────────────────────────────────────── -->
          <tr>
            <td style="padding:40px 32px 32px;">

              <!-- Graduation cap icon -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 20px;">
                <tr>
                  <td style="width:64px; height:64px; background:#FEF3C7; border-radius:50%; text-align:center; vertical-align:middle; font-size:30px; line-height:64px;">
                    &#127891;
                  </td>
                </tr>
              </table>

              <!-- Headline -->
              <p style="margin:0 0 8px; font-family:Georgia,'Times New Roman',serif; font-size:26px; font-weight:700; color:#0D1B3E; text-align:center; letter-spacing:-0.02em;">
                You're officially on the list
              </p>

              ${hasInstitution ? `
              <!-- University badge -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
                <tr>
                  <td style="padding:13px 16px; background:#EFF6FF; border:1.5px solid #BFDBFE; border-radius:10px; text-align:center;">
                    <p style="margin:0 0 3px; font-family:Arial,sans-serif; font-size:10px; font-weight:700; color:#1D4ED8; text-transform:uppercase; letter-spacing:0.10em;">&#127979;&nbsp; Institution</p>
                    <p style="margin:0; font-family:Georgia,'Times New Roman',serif; font-size:18px; font-weight:700; color:#1E3A8A;">${institutionDisplay}</p>
                  </td>
                </tr>
              </table>
              ` : ''}

              <p style="margin:0 0 28px; font-family:Arial,sans-serif; font-size:14px; color:#475569; text-align:center; line-height:1.7;">
                Hi <strong style="color:#0D1B3E;">${greeting}</strong> — your waitlist spot is confirmed.<br />
                We'll reach out the moment AKEP opens for your cohort.
              </p>

              <!-- Early access callout -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                <tr>
                  <td style="padding:16px 18px; background:#FFFBEB; border:1.5px solid #F59E0B; border-radius:10px;">
                    <p style="margin:0 0 5px; font-family:Arial,sans-serif; font-size:11px; font-weight:700; color:#92400E; text-transform:uppercase; letter-spacing:0.09em;">
                      &#127942;&nbsp; Early Access Benefit
                    </p>
                    <p style="margin:0; font-family:Arial,sans-serif; font-size:14px; color:#78350F; line-height:1.6;">
                      ${hasInstitution ? `<strong>${institutionDisplay}</strong> gets ` : 'Waitlist members get '}<strong>6 months of University-tier access free</strong> at launch, plus dedicated onboarding from our team.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                <tr><td style="height:1px; background:#E2E8F0; font-size:0; line-height:0;">&nbsp;</td></tr>
              </table>

              <!-- What's coming heading -->
              <p style="margin:0 0 16px; font-family:Georgia,'Times New Roman',serif; font-size:15px; font-weight:700; color:#0D1B3E;">
                What you'll get at launch
              </p>

              <!-- Feature 1 -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;">
                <tr>
                  <td style="width:28px; vertical-align:top; padding-top:1px;">
                    <div style="width:22px; height:22px; background:#ECFDF5; border-radius:50%; text-align:center; line-height:22px; font-size:11px; color:#059669; font-weight:700;">&#10003;</div>
                  </td>
                  <td style="vertical-align:top; padding-left:4px;">
                    <p style="margin:0 0 2px; font-family:Arial,sans-serif; font-size:14px; color:#1E293B; font-weight:700;">AI-powered duplicate detection</p>
                    <p style="margin:0; font-family:Arial,sans-serif; font-size:13px; color:#64748B; line-height:1.5;">Automatically flag similar dissertation topics across your institution and partner universities.</p>
                  </td>
                </tr>
              </table>

              <!-- Feature 2 -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;">
                <tr>
                  <td style="width:28px; vertical-align:top; padding-top:1px;">
                    <div style="width:22px; height:22px; background:#ECFDF5; border-radius:50%; text-align:center; line-height:22px; font-size:11px; color:#059669; font-weight:700;">&#10003;</div>
                  </td>
                  <td style="vertical-align:top; padding-left:4px;">
                    <p style="margin:0 0 2px; font-family:Arial,sans-serif; font-size:14px; color:#1E293B; font-weight:700;">Intelligent supervisor matching</p>
                    <p style="margin:0; font-family:Arial,sans-serif; font-size:13px; color:#64748B; line-height:1.5;">Match students to supervisors based on expertise, availability, and workload — automatically.</p>
                  </td>
                </tr>
              </table>

              <!-- Feature 3 -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                <tr>
                  <td style="width:28px; vertical-align:top; padding-top:1px;">
                    <div style="width:22px; height:22px; background:#ECFDF5; border-radius:50%; text-align:center; line-height:22px; font-size:11px; color:#059669; font-weight:700;">&#10003;</div>
                  </td>
                  <td style="vertical-align:top; padding-left:4px;">
                    <p style="margin:0 0 2px; font-family:Arial,sans-serif; font-size:14px; color:#1E293B; font-weight:700;">One-click accreditation reporting</p>
                    <p style="margin:0; font-family:Arial,sans-serif; font-size:13px; color:#64748B; line-height:1.5;">Export clean reports for your graduate office or accreditation body — always audit-ready.</p>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:22px;">
                <tr><td style="height:1px; background:#E2E8F0; font-size:0; line-height:0;">&nbsp;</td></tr>
              </table>

              <!-- Follow us -->
              <p style="margin:0 0 5px; font-family:Georgia,'Times New Roman',serif; font-size:15px; font-weight:700; color:#0D1B3E;">Stay in the loop</p>
              <p style="margin:0 0 16px; font-family:Arial,sans-serif; font-size:13px; color:#64748B; line-height:1.6;">
                Follow us for launch updates, early previews, and academic research news.
              </p>

              <!-- Social buttons -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                <tr>
                  <td style="padding-right:10px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background:#0A66C2; border-radius:8px;">
                          <a href="${linkedinUrl}" target="_blank" style="display:inline-block; padding:10px 20px; font-family:Arial,sans-serif; font-size:13px; font-weight:700; color:#ffffff; text-decoration:none;">
                            in&nbsp;&nbsp;LinkedIn
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background:#111827; border-radius:8px;">
                          <a href="${twitterUrl}" target="_blank" style="display:inline-block; padding:10px 20px; font-family:Arial,sans-serif; font-size:13px; font-weight:700; color:#ffffff; text-decoration:none;">
                            &#120143;&nbsp;&nbsp;Follow on X
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Ignore note -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:12px 14px; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px;">
                    <p style="margin:0; font-family:Arial,sans-serif; font-size:12px; color:#64748B; line-height:1.6;">
                      If you didn't sign up for the AKEP waitlist, you can safely ignore this email — no account has been created and no further action is needed.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ── FOOTER ──────────────────────────────────────── -->
          <tr>
            <td style="padding:18px 32px; background:#F8FAFC; border-top:1px solid #E2E8F0;">
              <p style="margin:0 0 4px; font-family:Arial,sans-serif; font-size:11px; color:#94A3B8; text-align:center;">
                AKEP &bull; Klagenfurt, Austria
              </p>
              <p style="margin:0; font-family:Arial,sans-serif; font-size:11px; color:#94A3B8; text-align:center;">
                <a href="${supportUrl}" style="color:#64748B; text-decoration:none;">Support</a>
                &nbsp;&bull;&nbsp;
                <a href="mailto:info@akepapp.com" style="color:#64748B; text-decoration:none;">info@akepapp.com</a>
              </p>
            </td>
          </tr>

        </table>

        <!-- Copyright line -->
        <p style="margin:14px 0 0; font-family:Arial,sans-serif; font-size:11px; color:#94A3B8; text-align:center;">
          &copy; ${year} AKEP. All rights reserved.
        </p>

      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Demo / contact confirmation HTML email */
function buildDemoEmail({ name, institution }) {
  const hasName = typeof name === "string" && name.trim().length > 0;
  const hasInstitution = typeof institution === "string" && institution.trim().length > 0;
  const firstName = hasName ? name.trim().split(" ")[0] : null;
  const institutionDisplay = hasInstitution ? institution.trim() : "your institution";
  const greeting = firstName || (hasInstitution ? `${institutionDisplay} team` : "there");
  const linkedinUrl = process.env.AKEP_LINKEDIN_URL || "https://linkedin.com/company/akepapp";
  const twitterUrl  = process.env.AKEP_TWITTER_URL  || "https://twitter.com/akepapp";
  const supportUrl  = process.env.SUPPORT_URL        || "mailto:support@akepapp.com";
  const year = new Date().getFullYear();

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Your AKEP demo request is received</title>
</head>
<body style="margin:0; padding:0; background-color:#eef0f5; font-family:Arial, Helvetica, sans-serif;">

  <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent; font-size:1px; line-height:1px; mso-hide:all;">
    We've received your demo request and will get back to you within one business day.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#eef0f5;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 8px 32px rgba(13,27,62,0.12);">

          <!-- HEADER -->
          <tr>
            <td style="padding:22px 32px; background:#0D1B3E;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="width:34px; height:34px; border:1.5px solid rgba(245,158,11,0.55); border-radius:8px; text-align:center; vertical-align:middle; background:#0D1B3E;">
                          <span style="color:#F59E0B; font-family:Georgia,'Times New Roman',serif; font-size:17px; font-weight:700; line-height:1; display:block; padding-top:6px;">A</span>
                        </td>
                        <td style="padding-left:10px; vertical-align:middle;">
                          <span style="color:#ffffff; font-family:Georgia,'Times New Roman',serif; font-size:19px; font-weight:700; letter-spacing:0.06em;">AKEP</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <span style="color:rgba(245,158,11,0.65); font-family:Arial,sans-serif; font-size:10px; letter-spacing:0.10em; text-transform:uppercase;">Academic Platform</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Gold accent line -->
          <tr>
            <td style="height:3px; background:#F59E0B; font-size:0; line-height:0;">&nbsp;</td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:40px 32px 32px;">

              <!-- Icon -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 20px;">
                <tr>
                  <td style="width:64px; height:64px; background:#FEF3C7; border-radius:50%; text-align:center; vertical-align:middle; font-size:30px; line-height:64px;">
                    &#128197;
                  </td>
                </tr>
              </table>

              <!-- Headline -->
              <p style="margin:0 0 8px; font-family:Georgia,'Times New Roman',serif; font-size:26px; font-weight:700; color:#0D1B3E; text-align:center; letter-spacing:-0.02em;">
                Demo request received
              </p>

              ${hasInstitution ? `
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
                <tr>
                  <td style="padding:13px 16px; background:#EFF6FF; border:1.5px solid #BFDBFE; border-radius:10px; text-align:center;">
                    <p style="margin:0 0 3px; font-family:Arial,sans-serif; font-size:10px; font-weight:700; color:#1D4ED8; text-transform:uppercase; letter-spacing:0.10em;">&#127979;&nbsp; Institution</p>
                    <p style="margin:0; font-family:Georgia,'Times New Roman',serif; font-size:18px; font-weight:700; color:#1E3A8A;">${institutionDisplay}</p>
                  </td>
                </tr>
              </table>
              ` : ''}

              <p style="margin:0 0 28px; font-family:Arial,sans-serif; font-size:14px; color:#475569; text-align:center; line-height:1.7;">
                Hi <strong style="color:#0D1B3E;">${greeting}</strong> — thanks for reaching out.<br />
                Our team will get back to you within <strong>one business day</strong> to schedule your personalised demo.
              </p>

              <!-- What to expect callout -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                <tr>
                  <td style="padding:16px 18px; background:#FFFBEB; border:1.5px solid #F59E0B; border-radius:10px;">
                    <p style="margin:0 0 5px; font-family:Arial,sans-serif; font-size:11px; font-weight:700; color:#92400E; text-transform:uppercase; letter-spacing:0.09em;">
                      &#128336;&nbsp; What happens next
                    </p>
                    <p style="margin:0; font-family:Arial,sans-serif; font-size:14px; color:#78350F; line-height:1.6;">
                      We'll send a calendar invite for a <strong>30-minute live walkthrough</strong> of AKEP, tailored to ${hasInstitution ? `<strong>${institutionDisplay}</strong>` : 'your institution'}.
                    </p>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                <tr><td style="height:1px; background:#E2E8F0; font-size:0; line-height:0;">&nbsp;</td></tr>
              </table>

              <p style="margin:0 0 16px; font-family:Georgia,'Times New Roman',serif; font-size:15px; font-weight:700; color:#0D1B3E;">
                What we'll show you
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;">
                <tr>
                  <td style="width:28px; vertical-align:top; padding-top:1px;">
                    <div style="width:22px; height:22px; background:#ECFDF5; border-radius:50%; text-align:center; line-height:22px; font-size:11px; color:#059669; font-weight:700;">&#10003;</div>
                  </td>
                  <td style="vertical-align:top; padding-left:4px;">
                    <p style="margin:0 0 2px; font-family:Arial,sans-serif; font-size:14px; color:#1E293B; font-weight:700;">AI duplicate detection in action</p>
                    <p style="margin:0; font-family:Arial,sans-serif; font-size:13px; color:#64748B; line-height:1.5;">See how AKEP instantly flags overlapping topics across your institution's dissertation archive.</p>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;">
                <tr>
                  <td style="width:28px; vertical-align:top; padding-top:1px;">
                    <div style="width:22px; height:22px; background:#ECFDF5; border-radius:50%; text-align:center; line-height:22px; font-size:11px; color:#059669; font-weight:700;">&#10003;</div>
                  </td>
                  <td style="vertical-align:top; padding-left:4px;">
                    <p style="margin:0 0 2px; font-family:Arial,sans-serif; font-size:14px; color:#1E293B; font-weight:700;">Supervisor matching dashboard</p>
                    <p style="margin:0; font-family:Arial,sans-serif; font-size:13px; color:#64748B; line-height:1.5;">Live demo of smart assignment based on expertise, availability, and workload balance.</p>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                <tr>
                  <td style="width:28px; vertical-align:top; padding-top:1px;">
                    <div style="width:22px; height:22px; background:#ECFDF5; border-radius:50%; text-align:center; line-height:22px; font-size:11px; color:#059669; font-weight:700;">&#10003;</div>
                  </td>
                  <td style="vertical-align:top; padding-left:4px;">
                    <p style="margin:0 0 2px; font-family:Arial,sans-serif; font-size:14px; color:#1E293B; font-weight:700;">One-click accreditation exports</p>
                    <p style="margin:0; font-family:Arial,sans-serif; font-size:13px; color:#64748B; line-height:1.5;">Walkthrough of audit-ready reports your graduate office can produce in seconds.</p>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:22px;">
                <tr><td style="height:1px; background:#E2E8F0; font-size:0; line-height:0;">&nbsp;</td></tr>
              </table>

              <p style="margin:0 0 5px; font-family:Georgia,'Times New Roman',serif; font-size:15px; font-weight:700; color:#0D1B3E;">Stay in the loop</p>
              <p style="margin:0 0 16px; font-family:Arial,sans-serif; font-size:13px; color:#64748B; line-height:1.6;">
                Follow us for launch updates, early previews, and academic research news.
              </p>

              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                <tr>
                  <td style="padding-right:10px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background:#0A66C2; border-radius:8px;">
                          <a href="${linkedinUrl}" target="_blank" style="display:inline-block; padding:10px 20px; font-family:Arial,sans-serif; font-size:13px; font-weight:700; color:#ffffff; text-decoration:none;">
                            in&nbsp;&nbsp;LinkedIn
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background:#111827; border-radius:8px;">
                          <a href="${twitterUrl}" target="_blank" style="display:inline-block; padding:10px 20px; font-family:Arial,sans-serif; font-size:13px; font-weight:700; color:#ffffff; text-decoration:none;">
                            &#120143;&nbsp;&nbsp;Follow on X
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:12px 14px; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px;">
                    <p style="margin:0; font-family:Arial,sans-serif; font-size:12px; color:#64748B; line-height:1.6;">
                      If you didn't request a demo from AKEP, you can safely ignore this email — no account has been created.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:18px 32px; background:#F8FAFC; border-top:1px solid #E2E8F0;">
              <p style="margin:0 0 4px; font-family:Arial,sans-serif; font-size:11px; color:#94A3B8; text-align:center;">
                AKEP &bull; Klagenfurt, Austria
              </p>
              <p style="margin:0; font-family:Arial,sans-serif; font-size:11px; color:#94A3B8; text-align:center;">
                <a href="${supportUrl}" style="color:#64748B; text-decoration:none;">Support</a>
                &nbsp;&bull;&nbsp;
                <a href="mailto:info@akepapp.com" style="color:#64748B; text-decoration:none;">info@akepapp.com</a>
              </p>
            </td>
          </tr>

        </table>

        <p style="margin:14px 0 0; font-family:Arial,sans-serif; font-size:11px; color:#94A3B8; text-align:center;">
          &copy; ${year} AKEP. All rights reserved.
        </p>

      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Send demo confirmation to the user who requested it */
async function sendDemoConfirmation({ to, name, institution }) {
  const hasInstitution = typeof institution === "string" && institution.trim().length > 0;
  const subject = hasInstitution
    ? `${institution.trim()} — your AKEP demo request is confirmed`
    : "Your AKEP demo request is confirmed — we'll be in touch within 24h";
  await sendEmail({
    to,
    fromName: "AKEP Team",
    subject,
    html: buildDemoEmail({ name, institution }),
  });
}

/** Send waitlist confirmation to the user who signed up */
async function sendWaitlistConfirmation({ to, name, institution }) {
  await sendEmail({
    to,
    fromName: "AKEP Team",
    subject: "You're on the AKEP waitlist",
    html: buildWaitlistEmail({ name, institution }),
  });
}

/**
 * Add contact to a Resend Audience (optional).
 * Skipped unless RESEND_AUDIENCE_ID is set.
 */
async function addToResendContacts({ email, name }) {
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!audienceId) return;
  const payload = { email };
  if (typeof name === "string" && name.trim()) {
    const parts = name.trim().split(" ");
    payload.first_name = parts[0];
    if (parts.length > 1) payload.last_name = parts.slice(1).join(" ");
  }
  const res = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY || ""}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Resend Contacts API ${res.status}: ${await res.text()}`);
  }
}

/**
 * Append a waitlist entry to server/data/waitlist.jsonl
 * One JSON object per line — easy to parse, import to a spreadsheet, or migrate to a DB.
 * Non-fatal: a write failure never blocks the API response.
 */
function appendToWaitlistLog(entry) {
  try {
    mkdirSync(DATA_DIR, { recursive: true });
    appendFileSync(WAITLIST_LOG, JSON.stringify(entry) + "\n", "utf8");
  } catch (err) {
    console.error("waitlist_log_error", err.message);
  }
}

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/waitlist", waitlistLimiter, async (req, res) => {
  try {
    const { name, email, institution, role, country, source, challenge } = req.body || {};

    if (!validEmail(email)) {
      res.status(400).json({ ok: false, error: "A valid email address is required." });
      return;
    }

    // Sanitise all free-text fields before using in admin email
    const safeName        = sanitise(name);
    const safeInstitution = sanitise(institution);
    const safeRole        = sanitise(role);
    const safeCountry     = sanitise(country, 100);
    const safeSource      = sanitise(source, 100);
    const safeChallenge   = sanitise(challenge, 1000);

    const lines = [
      "New waitlist submission",
      "",
      `Name:        ${safeName        || "-"}`,
      `Email:       ${email.trim()}`,
      `Institution: ${safeInstitution || "-"}`,
      `Role:        ${safeRole        || "-"}`,
      `Country:     ${safeCountry     || "-"}`,
      `Source:      ${safeSource      || "-"}`,
      `Challenge:   ${safeChallenge   || "-"}`,
      "",
      `Submitted at: ${new Date().toISOString()}`,
    ];

    // Emails + Resend Contacts run in parallel.
    // Contacts failure is non-fatal so it never blocks the response.
    await Promise.all([
      sendAdminNotification({
        subject: `[AKEP Waitlist] ${safeInstitution || email.trim()}`,
        body: lines.join("\n"),
      }),
      sendWaitlistConfirmation({ to: email.trim(), name: safeName, institution: safeInstitution }),
      addToResendContacts({ email: email.trim(), name: safeName }).catch((e) =>
        console.error("contacts_api_error", e.message)
      ),
    ]);

    // Local JSONL backup — always non-fatal
    appendToWaitlistLog({
      name:        safeName        || null,
      email:       email.trim(),
      institution: safeInstitution || null,
      role:        safeRole        || null,
      country:     safeCountry     || null,
      source:      safeSource      || null,
      challenge:   safeChallenge   || null,
      ts:          new Date().toISOString(),
    });

    res.json({ ok: true });
  } catch (error) {
    console.error("waitlist_error", error);
    res.status(500).json({ ok: false, error: "Failed to submit waitlist request" });
  }
});

app.post("/api/contact", contactLimiter, async (req, res) => {
  try {
    const { name, email, institution, subject, message } = req.body || {};

    if (!required(name) || !validEmail(email)) {
      res.status(400).json({ ok: false, error: "Name and a valid email are required." });
      return;
    }

    const safeName        = sanitise(name);
    const safeInstitution = sanitise(institution);
    const safeSubject     = sanitise(subject);
    const safeMessage     = sanitise(message, 2000);

    const lines = [
      "New contact/demo submission",
      "",
      `Name:        ${safeName}`,
      `Email:       ${email.trim()}`,
      `Institution: ${safeInstitution || "-"}`,
      `Subject:     ${safeSubject     || "-"}`,
      `Message:     ${safeMessage     || "-"}`,
      "",
      `Submitted at: ${new Date().toISOString()}`,
    ];

    await Promise.all([
      sendAdminNotification({
        subject: `[AKEP Contact] ${safeSubject || safeName}`,
        body: lines.join("\n"),
      }),
      sendDemoConfirmation({ to: email.trim(), name: safeName, institution: safeInstitution }),
    ]);

    res.json({ ok: true });
  } catch (error) {
    console.error("contact_error", error);
    res.status(500).json({ ok: false, error: "Failed to send contact request" });
  }
});

app.listen(PORT, () => {
  console.log(`Email API listening on port ${PORT}`);
});