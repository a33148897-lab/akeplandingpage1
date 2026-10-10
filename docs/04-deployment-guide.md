# AKEP — Deployment Guide (AWS)

> **Recommended stack:** AWS Amplify (frontend) + AWS App Runner (backend)  
> Auto-deploys on every `git push` to `main`. No server management required.

---

## 1. Architecture

```
GitHub repo (main branch)
        │
        ├── git push ──► AWS Amplify
        │                 └── npm run build → dist/ → S3 + CloudFront CDN
        │                     Custom domain: akepapp.com
        │
        └── git push ──► AWS App Runner
                          └── npm start (node src/index.js)
                              Custom domain: api.akepapp.com
```

---

## 2. Pre-Deployment Checklist

Before deploying, confirm:

- [ ] Code is pushed to `main` branch on GitHub
- [ ] `server/.env` is in `.gitignore` (it is — verified)
- [ ] `server/package.json` has `"start": "node src/index.js"` (it does)
- [ ] All env variables are ready to paste into AWS dashboards
- [ ] SendGrid API key is valid and rotated (the key visible in this chat session should be regenerated)
- [ ] `ALLOWED_ORIGINS` will be updated with production domain after Amplify URL is known

---

## 3. Step 1 — Deploy Backend (AWS App Runner)

App Runner deploys your Node.js Express server directly from GitHub source code.

### Setup steps

1. **AWS Console** → search "App Runner" → **Create service**

2. **Source:**
   - Source: *Source code repository*
   - Provider: GitHub → Connect → authorize AWS
   - Repository: your AKEP repo
   - Branch: `main`
   - Deployment: **Automatic** ✅ (this enables auto-deploy on push)

3. **Build settings:**
   - Runtime: **Node.js 22**
   - Root directory: `server`
   - Build command: `npm ci`
   - Start command: `node src/index.js`
   - Port: `8787`

4. **Service settings:**
   - Service name: `akep-api`
   - CPU: 0.25 vCPU, Memory: 0.5 GB (sufficient for landing page traffic)

5. **Environment variables** — add each of these:
   ```
   PORT                      = 8787
   SENDGRID_API_KEY          = SG.your_new_rotated_key_here
   FROM_EMAIL                = no-reply@akepapp.com
   NOTIFY_TO                 = atlebbie@gmail.com
   ALLOWED_ORIGINS           = https://akepapp.com,https://www.akepapp.com
   AKEP_LINKEDIN_URL         = https://linkedin.com/company/akepapp
   AKEP_TWITTER_URL          = https://twitter.com/akepapp
   SUPPORT_URL               = https://akepapp.com/support
   SENDGRID_WAITLIST_LIST_ID = (leave empty or add your list ID)
   ```

6. Click **Create & deploy** — App Runner builds and starts the server (~3 min)

7. Note your App Runner URL: `https://abc123xyz.us-east-1.awsapprunner.com`

### Verify backend is live
```
GET https://abc123xyz.us-east-1.awsapprunner.com/health
→ { "ok": true }
```

---

## 4. Step 2 — Deploy Frontend (AWS Amplify)

Amplify handles the React/Vite build and serves via CloudFront CDN.

### Setup steps

1. **AWS Console** → search "Amplify" → **New App → Host web app**

2. Connect **GitHub** → select your repo → branch: `main`

3. **Build settings** — Amplify auto-detects Vite. Confirm:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

4. **Environment variables** (in Amplify → App settings → Environment variables):
   ```
   VITE_API_BASE_URL = https://abc123xyz.us-east-1.awsapprunner.com
   ```
   *(Replace with your actual App Runner URL from Step 3)*

5. Click **Save and deploy** — Amplify builds and deploys (~2 min)

6. Note your Amplify URL: `https://main.d1abc123.amplifyapp.com`

---

## 5. Step 3 — Connect Custom Domain

### Frontend — akepapp.com → Amplify

1. Amplify → your app → **Domain management → Add domain**
2. Enter `akepapp.com`
3. Amplify generates SSL certificate + gives you DNS records
4. In your DNS provider, add the CNAME/ALIAS records Amplify provides
5. Also add `www.akepapp.com` → redirects to root
6. Propagation: up to 24h, usually under 1h

### Backend — api.akepapp.com → App Runner

1. App Runner → your service → **Custom domains → Add**
2. Enter `api.akepapp.com`
3. Add the CNAME record to your DNS provider
4. Update `ALLOWED_ORIGINS` in App Runner env vars:
   ```
   ALLOWED_ORIGINS=https://akepapp.com,https://www.akepapp.com
   ```
5. Update `VITE_API_BASE_URL` in Amplify:
   ```
   VITE_API_BASE_URL=https://api.akepapp.com
   ```
6. Trigger a new Amplify deploy (push a commit or click "Redeploy")

---

## 6. Auto-Deploy Behaviour After Setup

Once both services are configured:

```
git add .
git commit -m "update hero copy"
git push origin main
         │
         ├── Amplify detects push → runs npm run build → deploys dist/ to CDN
         │   (~60–90 seconds)
         │
         └── App Runner detects push → runs npm ci → restarts server
             (~2–3 minutes)
```

Zero manual steps. Zero downtime on Amplify (CDN swap). Minimal downtime on App Runner (~10s restart).

---

## 7. Environment Variables — Full Reference

### Frontend (set in Amplify)
| Variable | Value |
|---|---|
| `VITE_API_BASE_URL` | `https://api.akepapp.com` |

### Backend (set in App Runner)
| Variable | Required | Value |
|---|---|---|
| `PORT` | No | `8787` |
| `SENDGRID_API_KEY` | ✅ | Your SendGrid API key |
| `FROM_EMAIL` | ✅ | `no-reply@akepapp.com` |
| `NOTIFY_TO` | ✅ | Your notification inbox |
| `ALLOWED_ORIGINS` | ✅ | `https://akepapp.com,https://www.akepapp.com` |
| `AKEP_LINKEDIN_URL` | No | `https://linkedin.com/company/akepapp` |
| `AKEP_TWITTER_URL` | No | `https://twitter.com/akepapp` |
| `SUPPORT_URL` | No | `https://akepapp.com/support` |
| `SENDGRID_WAITLIST_LIST_ID` | No | SendGrid contact list ID |

---

## 8. Post-Deployment Smoke Test

Run these checks immediately after deployment:

```bash
# 1. Health check
curl https://api.akepapp.com/health
# Expected: {"ok":true}

# 2. Waitlist submission
curl -X POST https://api.akepapp.com/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"name":"Deploy Test","email":"your@email.com","institution":"Test University"}'
# Expected: {"ok":true}
# Expected: Confirmation email arrives in your inbox

# 3. Contact submission
curl -X POST https://api.akepapp.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Deploy Test","email":"your@email.com","institution":"Test Co","subject":"Live Demo Request"}'
# Expected: {"ok":true}
# Expected: Demo confirmation + admin notification arrive in inbox
```

---

## 9. Cost Estimate (AWS, low traffic)

| Service | Tier | Monthly cost |
|---|---|---|
| AWS Amplify | Free tier (1000 build min/mo, 5 GB hosting) | **$0** |
| AWS App Runner | 0.25 vCPU active + idle pricing | ~**$5–12** |
| CloudFront (via Amplify) | Included | **$0** |
| SendGrid | Free tier (100 emails/day) | **$0** |
| **Total** | | **~$5–12/month** |

---

## 10. Alternative — GitHub Actions + S3 + Elastic Beanstalk

If you want lower cost and more control, this is the power-user path:

- **Frontend:** GitHub Actions builds Vite → uploads `dist/` to S3 → invalidates CloudFront
- **Backend:** GitHub Actions zips `server/` → deploys to Elastic Beanstalk
- **Cost:** ~$0 frontend, ~$0 backend during AWS Free Tier (12 months)
- **Trade-off:** You must write and maintain `.github/workflows/deploy.yml`

Recommended only after launch when you want to optimise costs.
