# AKEP Deployment Guide – AWS SES + EC2/Lambda + S3/CloudFront

Complete setup for Cloudflare domain (akepapp.com) → AWS infrastructure with SES email.

---

## Architecture Overview

```
akepapp.com (Cloudflare DNS)
├── www.akepapp.com → CloudFront → S3 (Frontend)
├── api.akepapp.com → existing Python API on EC2
│   └── email_service/ → isolated email endpoints only
└── SES (Email sending from AWS SES)
```

The email service must stay inside the existing `email_service` folder in the API repo. Keep it endpoint-only, modular, and independent from the rest of the Python application. The frontend will connect to it later through `api.akepapp.com`, so do not mix the email code into unrelated Python packages or core business logic.

---

## Phase 1: AWS Account Setup — ~5 minutes

### 1.1 Create AWS Account
- Go to https://aws.amazon.com
- Click "Create an AWS Account"
- Provide billing info (free tier available for first 12 months)
- Verify email and phone

### 1.2 Create IAM User for Development
- Go to IAM console
- Create user with programmatic access
- Attach policies: `AdministratorAccess` (for dev; restrict later for prod)
- Download credentials (CSV with Access Key ID & Secret Access Key)
- Save securely

### 1.3 Configure AWS CLI Locally
```bash
aws configure
```
Enter:
- AWS Access Key ID: (from CSV)
- AWS Secret Access Key: (from CSV)
- Default region: `us-east-1`
- Default output format: `json`

---

## Phase 2: Amazon SES Setup — ~10 minutes

### 2.1 Verify Your Domain in SES
- Go to AWS console → SES (Simple Email Service)
- Region: `us-east-1` (recommended; SES available in most regions)
- Left sidebar: "Verified identities"
- Click "Create identity"
  - Type: Domain
  - Domain name: `akepapp.com`
  - Click "Create identity"

### 2.2 Add DNS Records for SES Verification
AWS will show you CNAME/TXT records. Add them to Cloudflare:
1. In Cloudflare DNS:
   - Add DKIM CNAME records (usually 3 records like `xxxxx._domainkey.akepapp.com`)
   - Add SPF TXT record if not already present
   - Add DMARC TXT record (optional but recommended)

Example (check AWS SES console for exact values):
```
Token 1: xxxxx._domainkey.akepapp.com CNAME xxxx.dkim.amazonses.com
Token 2: xxxxx._domainkey.akepapp.com CNAME xxxx.dkim.amazonses.com
Token 3: xxxxx._domainkey.akepapp.com CNAME xxxx.dkim.amazonses.com
SPF: v=spf1 include:amazonses.com ~all
DMARC: v=DMARC1; p=quarantine; rua=mailto:postmaster@akepapp.com
```

### 2.3 Wait for SES Verification
- Back in SES console, click your domain
- Status will change from "Pending verification" to "Verified" (5–10 min)
- Click "Request production access" (exit sandbox mode)
  - AWS may ask why; explain: "Transactional emails for landing page"
  - Usually approved within hours

### 2.4 Get SES Credentials
- In SES console → "SMTP settings"
- Copy:
  - SMTP endpoint: `email-smtp.us-east-1.amazonaws.com`
  - Port: `587` (TLS)
- Generate SMTP credentials (if not auto-generated):
  - Click "Create SMTP credentials"
  - Save Username and Password securely

---

## Phase 3: Backend Deployment — Choose One Option

### Option A: AWS Lambda + API Gateway (Recommended for Serverless)

#### 3A.1 Install Serverless Framework
```bash
npm install -g serverless
serverless --version
```

#### 3A.2 Create Serverless Backend
In project root, create `serverless.yml`:
```yaml
service: akep-email-api

frameworkVersion: '3'

provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1
  environment:
    SMTP_HOST: ${env:SMTP_HOST}
    SMTP_PORT: ${env:SMTP_PORT}
    SMTP_SECURE: ${env:SMTP_SECURE}
    SMTP_USER: ${env:SMTP_USER}
    SMTP_PASS: ${env:SMTP_PASS}
    NOTIFY_TO: ${env:NOTIFY_TO}
    FROM_EMAIL: ${env:FROM_EMAIL}
    ALLOWED_ORIGINS: ${env:ALLOWED_ORIGINS}

functions:
  api:
    handler: server/src/lambda.handler
    events:
      - http:
          path: /{proxy+}
          method: ANY
          cors: true
      - http:
          path: /
          method: ANY
          cors: true

plugins:
  - serverless-offline
```

#### 3A.3 Create Lambda Handler
Create `server/src/lambda.js`:
```javascript
import "dotenv/config";
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import serverless from "serverless-http";

const app = express();

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(express.json());
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

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE || "false") === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function required(value) {
  return typeof value === "string" && value.trim().length > 0;
}

async function sendSubmissionEmail({ subject, body }) {
  const to = process.env.NOTIFY_TO;
  const from = process.env.FROM_EMAIL;

  if (!to || !from) {
    throw new Error("Missing NOTIFY_TO/FROM_EMAIL configuration");
  }

  await transporter.sendMail({ from, to, subject, text: body });
}

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/waitlist", async (req, res) => {
  try {
    const { name, email, institution, role, country, source, challenge } = req.body || {};

    if (!required(email)) {
      res.status(400).json({ ok: false, error: "Email is required" });
      return;
    }

    const lines = [
      "New waitlist submission",
      "",
      `Name: ${name || "-"}`,
      `Email: ${email}`,
      `Institution: ${institution || "-"}`,
      `Role: ${role || "-"}`,
      `Country: ${country || "-"}`,
      `Source: ${source || "-"}`,
      `Challenge: ${challenge || "-"}`,
      "",
      `Submitted at: ${new Date().toISOString()}`,
    ];

    await sendSubmissionEmail({
      subject: "[AKEP] Waitlist submission",
      body: lines.join("\n"),
    });

    res.json({ ok: true });
  } catch (error) {
    console.error("waitlist_error", error);
    res.status(500).json({ ok: false, error: "Failed to submit waitlist request" });
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, institution, subject, message } = req.body || {};

    if (!required(name) || !required(email)) {
      res.status(400).json({ ok: false, error: "Name and email are required" });
      return;
    }

    const lines = [
      "New contact/demo submission",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Institution: ${institution || "-"}`,
      `Subject: ${subject || "-"}`,
      `Message: ${message || "-"}`,
      "",
      `Submitted at: ${new Date().toISOString()}`,
    ];

    await sendSubmissionEmail({
      subject: "[AKEP] Contact request",
      body: lines.join("\n"),
    });

    res.json({ ok: true });
  } catch (error) {
    console.error("contact_error", error);
    res.status(500).json({ ok: false, error: "Failed to send contact request" });
  }
});

export const handler = serverless(app);
```

#### 3A.4 Install Dependencies
```bash
npm --prefix server install serverless-http
```

#### 3A.5 Deploy to Lambda
```bash
# Set env vars
export SMTP_HOST=email-smtp.us-east-1.amazonaws.com
export SMTP_PORT=587
export SMTP_SECURE=false
export SMTP_USER=your-ses-smtp-user
export SMTP_PASS=your-ses-smtp-password
export NOTIFY_TO=your-email@akepapp.com
export FROM_EMAIL=noreply@akepapp.com
export ALLOWED_ORIGINS=https://www.akepapp.com,https://akepapp.com

# Deploy
serverless deploy
```

- Serverless will output your API Gateway endpoint:
  ```
  endpoints:
    ANY - https://xxxxx.execute-api.us-east-1.amazonaws.com/{proxy+}
  ```
- Note this URL

---

### Option B: AWS EC2 (Simpler, More Control)

#### 3B.1 Create EC2 Instance
- AWS console → EC2 → "Launch instance"
  - AMI: Ubuntu 22.04 LTS (free tier eligible)
  - Instance type: t2.micro (free tier)
  - Key pair: Create new (download .pem file)
  - Security group: Allow HTTP (80), HTTPS (443), SSH (22)
  - Storage: 20 GB
  - Launch

#### 3B.2 SSH into Instance
```bash
chmod 600 your-key.pem
ssh -i your-key.pem ubuntu@your-instance-public-ip
```

#### 3B.3 Install Node & Dependencies
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2
```

#### 3B.4 Clone & Setup Backend
```bash
cd /home/ubuntu
git clone https://github.com/your-username/Akeplandingpage.git
cd Akeplandingpage/server
npm install
```

#### 3B.5 Create .env on EC2
```bash
nano .env
```
Paste:
```
PORT=8787
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-ses-smtp-user
SMTP_PASS=your-ses-smtp-password
NOTIFY_TO=your-email@akepapp.com
FROM_EMAIL=noreply@akepapp.com
ALLOWED_ORIGINS=https://www.akepapp.com,https://akepapp.com
NODE_ENV=production
```
Save: `Ctrl+X` → `Y` → Enter

#### 3B.6 Start with PM2
```bash
pm2 start src/index.js --name "akep-api"
pm2 startup
pm2 save
```

#### 3B.7 Install Nginx (Reverse Proxy)
```bash
sudo apt install -y nginx

# Create Nginx config
sudo nano /etc/nginx/sites-available/akep-api
```

Paste:
```nginx
upstream api {
  server 127.0.0.1:8787;
}

server {
  listen 80;
  server_name api.akepapp.com;

  location / {
    proxy_pass http://api;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

Save and enable:
```bash
sudo ln -s /etc/nginx/sites-available/akep-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 3B.8 Install SSL (Let's Encrypt)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d api.akepapp.com
```

#### 3B.9 Get Elastic IP
- AWS console → EC2 → Elastic IPs
- Allocate new address
- Associate with your instance
- Copy the Elastic IP

---

## Phase 4: Frontend (S3 + CloudFront) — ~10 minutes

### 4.1 Create S3 Bucket
```bash
aws s3api create-bucket \
  --bucket akepapp-frontend \
  --region us-east-1
```

### 4.2 Update Frontend .env
Create `.env.production`:
```
# For Lambda:
VITE_API_BASE_URL=https://xxxxx.execute-api.us-east-1.amazonaws.com

# For EC2:
VITE_API_BASE_URL=https://api.akepapp.com
```

### 4.3 Build Frontend
```bash
npm install
npm run build
```

### 4.4 Upload to S3
```bash
aws s3 sync dist/ s3://akepapp-frontend --delete
```

### 4.5 Create CloudFront Distribution
- AWS console → CloudFront → "Create distribution"
  - Origin domain: `akepapp-frontend.s3.us-east-1.amazonaws.com`
  - Viewer protocol: HTTPS only
  - Default root object: `index.html`
  - Custom error responses:
    - 403 → `/index.html` (HTTP 200)
    - 404 → `/index.html` (HTTP 200)
  - Create

- Note CloudFront domain: `dxxxxx.cloudfront.net`

---

## Phase 5: Cloudflare DNS Setup — ~5 minutes

### 5.1 Add DNS Records
In Cloudflare for `akepapp.com`:

**Frontend (www):**
- Type: CNAME
- Name: `www`
- Target: `dxxxxx.cloudfront.net`

**Backend (Lambda):**
- Type: CNAME
- Name: `api`
- Target: `xxxxx.execute-api.us-east-1.amazonaws.com`

**Backend (EC2):**
- Type: A
- Name: `api`
- Target: `your-elastic-ip`

**Root (@):**
- Type: CNAME
- Name: `@`
- Target: `dxxxxx.cloudfront.net`

### 5.2 SSL/TLS in Cloudflare
- SSL/TLS → Encryption mode: **Full (strict)**
- Always use HTTPS: **ON**

### 5.3 Wait for DNS Propagation
```bash
# Check DNS
nslookup www.akepapp.com
nslookup api.akepapp.com
```

---

## Phase 6: Test Everything

### 6.1 Frontend
```bash
curl https://www.akepapp.com
```
Should return HTML.

### 6.2 Backend Health
```bash
curl https://api.akepapp.com/health
```
Should return: `{"ok":true}`

### 6.3 Email Test
- Visit https://www.akepapp.com
- Submit a waitlist form
- Check your NOTIFY_TO email (should arrive in seconds)

---

## Phase 7: Update Your Frontend .env for Production

Edit `.env.production`:
```
VITE_API_BASE_URL=https://api.akepapp.com
```

Rebuild and redeploy:
```bash
npm run build
aws s3 sync dist/ s3://akepapp-frontend --delete
aws cloudfront create-invalidation --distribution-id dxxxxx --paths "/*"
```

---

## SES Best Practices

| Practice | Why |
|----------|-----|
| Use SES in `us-east-1` or `eu-west-1` | Better uptime & faster delivery |
| Exit sandbox mode ASAP | Sandbox limits you to 1 email/sec, 200/day |
| Use domain authentication | Improves deliverability vs email-only |
| Monitor bounce/complaint rates | AWS disables your account if rates are high |
| Set up SNS for bounce notifications | Know when emails fail |
| Use templates for consistent emails | Better formatting & reusability |

---

## Cost Estimate (Monthly)

| Service | Cost | Notes |
|---------|------|-------|
| SES | $0.10 per 1,000 emails | Free for first 62,000 in first 30 days |
| Lambda | $0.20 per 1M requests | First 1M free |
| EC2 t2.micro | $0 (free tier) or ~$8 | 750 hours free for 12 months |
| S3 | $0.023 per GB | ~$0–1/month for small site |
| CloudFront | $0.085 per GB | ~$1–5/month for small traffic |
| **Total** | ~**$0–20/month** | Very affordable |

---

## Recommended Path (Easiest to Hardest)

1. **Fastest:** Lambda + API Gateway (serverless, auto-scales, minimal ops)
2. **Most Control:** EC2 + Nginx (simple, familiar, more hands-on)
3. **Most Expensive:** Both (redundancy, but overkill for MVP)

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| SES stuck in sandbox | Request production access in SES console; usually approved in hours |
| Emails going to spam | Add SPF/DKIM records in Cloudflare; reduce complaint rate |
| API CORS errors | Check ALLOWED_ORIGINS env var; rebuild frontend |
| CloudFront shows old content | Invalidate cache: `aws cloudfront create-invalidation` |
| DNS not resolving | Wait 24h; check `nslookup api.akepapp.com` |
| 503 errors from API | Check EC2/Lambda logs; verify env vars |

---

**Which deployment option do you want to start with: Lambda or EC2?**
