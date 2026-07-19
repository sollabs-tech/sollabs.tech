# Deploy sollabs.tech on GitHub Pages

## One-time setup

1. Create public repo `sollabs-tech/sollabs.tech` (this project) if it does not exist.
2. Repo → **Settings → Pages**:
   - Source: **GitHub Actions**
   - Custom domain: `sollabs.tech`
   - Enforce HTTPS after DNS propagates
3. Org → **Settings → Profile**: upload `website/public/brand/github-avatar-512.png` as the organization avatar.

## DNS (domain you own)

At your registrar for `sollabs.tech`, point the apex (and optional `www`) at GitHub Pages per [GitHub’s custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site):

- **Apex** `sollabs.tech`: `A` records to GitHub Pages IPs (or ALIAS/ANAME if supported)
- **www** (optional): `CNAME` → `sollabs-tech.github.io`

The repo commits `website/public/CNAME` with `sollabs.tech` so deploys keep the domain.

### Domain already claimed on GitHub

API rejected attaching `sollabs.tech` (“already taken”). Verify the domain for the `sollabs-tech` org (or release it from another GitHub account) per [Verifying your custom domain for GitHub Pages](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages).

**Until verified**, CI builds with:

- `PUBLIC_SITE_URL=https://sollabs-tech.github.io`
- `PUBLIC_BASE_PATH=/sollabs.tech/`

Live URL: https://sollabs-tech.github.io/sollabs.tech/

**After verified**, switch workflow env to `PUBLIC_SITE_URL=https://sollabs.tech` and `PUBLIC_BASE_PATH=/`, then set the custom domain in repo Pages settings.

## CI

Push to `main` runs [`.github/workflows/pages.yml`](../../.github/workflows/pages.yml):

- `PUBLIC_SITE_URL=https://sollabs.tech`
- `PUBLIC_BASE_PATH=/`
- Artifact from `website/dist`
