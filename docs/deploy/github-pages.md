# Deploy sollabs.tech on GitHub Pages

## Repo settings

1. Repo → **Settings → Pages** → Source: **GitHub Actions**
2. Custom domain: `sollabs.tech` → Save → **Enforce HTTPS**
3. Org → **Settings → Pages** → domain verified for `sollabs.tech` (Pages verification, not only org profile badge)

## Namecheap DNS

| Type | Host | Value |
|------|------|-------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `sollabs-tech.github.io.` |

Remove parking / URL Redirect records on `@`. Apex must **not** resolve to `162.255.119.*` (Namecheap parking).

## CI

[`.github/workflows/pages.yml`](../../.github/workflows/pages.yml) builds with:

- `PUBLIC_SITE_URL=https://sollabs.tech`
- `PUBLIC_BASE_PATH=/`

`website/public/CNAME` contains `sollabs.tech`.
