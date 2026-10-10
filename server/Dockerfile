# ── Use official Node.js 22 LTS slim image ─────────────────────────────────
# "slim" = smaller, faster cold start, fewer security surfaces
FROM node:22-slim

# ── Set working directory inside the container ─────────────────────────────
WORKDIR /app

# ── Copy package files first (Docker layer caching optimization) ───────────
# If only source code changes, Docker reuses the cached npm install layer
COPY package*.json ./

# ── Install ONLY production dependencies ───────────────────────────────────
RUN npm ci --omit=dev

# ── Copy the rest of the source code ───────────────────────────────────────
COPY src ./src

# ── Create data directory for the JSONL backup file ────────────────────────
RUN mkdir -p /app/data

# ── Tell Docker the container listens on port 8787 ─────────────────────────
EXPOSE 8787

# ── Run as non-root user for security ──────────────────────────────────────
USER node

# ── Start the server ───────────────────────────────────────────────────────
CMD ["node", "src/index.js"]
