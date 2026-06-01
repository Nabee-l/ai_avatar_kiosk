# Magic Avatar AI Kiosk — Deployment Guide

## Prerequisites

- Node.js 18+ — [nodejs.org](https://nodejs.org)
- Git

---

## Local Development

```bash
# 1. Enter frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local and set NEXT_PUBLIC_API_URL to your Render backend URL

# 4. Start dev server
npm run dev
# → http://localhost:3000
```

---

## Demo Mode

Set `NEXT_PUBLIC_DEMO_MODE=true` to run the full kiosk flow without a backend:

- Skips camera upload to AI service
- Returns pre-generated `/demo/*.jpg` images
- Auto-approves payment after ~6 seconds
- All 8 screens fully clickable

```bash
# .env.local
NEXT_PUBLIC_DEMO_MODE=true
```

Regenerate demo images at any time:
```bash
npm run demo:gen-images
```

---

## Option 1 — Vercel (Recommended)

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### CLI deploy

```bash
# Install Vercel CLI
npm i -g vercel

# From the frontend directory:
cd frontend
vercel

# Follow prompts:
#   Root directory: frontend  (or run from inside frontend)
#   Build command:  npm run build     (auto-detected)
#   Output dir:     .next             (auto-detected)

# Set env vars for production
vercel env add NEXT_PUBLIC_API_URL production
# enter your Render URL, for example:
# https://ai-event-kiosk-api.onrender.com

vercel env add NEXT_PUBLIC_DEMO_MODE production
# enter: false

vercel env add NEXT_PUBLIC_APP_NAME production
# enter: Magic Avatar AI Kiosk

# Deploy to production
vercel --prod
```

Your URL: `https://your-project.vercel.app`

---

## Option 2 — Cloudflare Pages

```bash
# Install Wrangler
npm i -g wrangler
wrangler login

# From the frontend directory:
cd frontend
npm run build

# Deploy
wrangler pages deploy .next \
  --project-name magic-avatar-kiosk \
  --compatibility-date 2024-01-01

# Set env var
wrangler pages env add NEXT_PUBLIC_DEMO_MODE --env production
# → enter: true
```

> Note: Cloudflare Pages supports Next.js via the `@cloudflare/next-on-pages` adapter.
> Add `"pages:build": "npx @cloudflare/next-on-pages"` to scripts for full compatibility.

---

## Option 3 — Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli
netlify login

# From the frontend directory:
cd frontend

# Build + deploy
netlify deploy --build --dir=.next --prod

# Set env var
netlify env:set NEXT_PUBLIC_DEMO_MODE true
```

Create `netlify.toml` in `frontend/`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NEXT_PUBLIC_DEMO_MODE = "true"
```

---

## Monorepo Deployment (Frontend only)

All three platforms support deploying a subdirectory:

| Platform   | Setting              | Value      |
|------------|----------------------|------------|
| Vercel     | Root Directory       | `frontend` |
| Cloudflare | Build directory      | `frontend` |
| Netlify    | Base directory       | `frontend` |

---

## Environment Variables

| Variable                | Default | Description                             |
|-------------------------|---------|-----------------------------------------|
| `NEXT_PUBLIC_DEMO_MODE` | `false` | Enable full demo mode (no backend needed)|
| `NEXT_PUBLIC_API_URL`   | *(empty)*| Render backend URL, for example `https://ai-event-kiosk-api.onrender.com` |
| `NEXT_PUBLIC_APP_NAME`  | *(optional)* | App name for browser tab / PWA |

---

## Build Validation

```bash
cd frontend

npm run lint    # ESLint — must pass
npm run build   # Production build — must pass
```

Expected build output:
```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /api/generate
├ ƒ /api/health
├ ƒ /api/payment/status
└ ƒ /api/templates
```

---

## PWA / Kiosk Mode

The app is a PWA with fullscreen display mode:

- Add to home screen on iOS/Android for fullscreen kiosk experience
- Manifest: `public/manifest.json`
- Display: `fullscreen` (hides browser chrome completely)

For a physical kiosk deployment, launch Chrome/Edge in kiosk mode:
```bash
# Chrome kiosk mode (Windows/Linux)
chrome --kiosk http://localhost:3000

# Chrome app mode (macOS)
open -a "Google Chrome" --args --app=http://localhost:3000
```
