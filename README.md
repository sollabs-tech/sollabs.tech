# Sol Labs

Consulting site for [sollabs.tech](https://sollabs.tech) — outcomes for platform teams, proven with shipped products.

## Site

```bash
cd website
npm ci
npm run dev
npm run build
npm run screenshot
npm run lighthouse   # desktop + mobile → aim for 100 (see docs/lighthouse/)
```

Marketing copy lives in `website/src/site.config.ts`. Keep strategy/research out of this public repo.

## Brand

See [design/brand/README.md](design/brand/README.md). Rebuild assets:

```bash
cd website && node scripts/render-brand.mjs
```

## Deploy

GitHub Actions → Pages on push to `main`. Custom domain: `sollabs.tech` (`website/public/CNAME`).
