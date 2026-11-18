# Leadvium (`leadvium.pages.dev`) — Autonomous B2B Outbound & Revenue Engineering

Multilingual (`en`, `fa`, `ar`) marketing & product flagship for **Leadvium** — custom Done-For-You B2B lead discovery, 9-point headless diagnostics, 14-page automated executive audit PDFs, and multi-channel outbound infrastructure operated on a **4-Week Custom Project Sprint** or **Monthly Managed Retainer**.

- **Live URL:** `https://leadvium.pages.dev` (Cloudflare Pages project `leadvium`)
- **Pre-rendered Routes:** `24` localized pages (`8` deep routes × `3` languages) + `404.html` + `sitemap.xml`
- **Edge API (`functions/`):** `GET /api/health` & `POST /api/intake`

## Commands

```bash
npm run build            # Build dist/
npm run verify           # Build + run strict link, /fa/ Persian digit & leak gates
npm run qa               # Headless Chrome 1440px & 390px overflow + E2E QA sweep
npm run functions:check  # Compile Cloudflare Pages Functions bundle check
```
