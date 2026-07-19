# Lighthouse justifications

Gate: `cd website && npm run lighthouse` (desktop + mobile, Chrome headless).  
Skill: global `lighthouse-100`.

## Latest run (2026-07-19)

Critical routes: `/`, `/outcomes/soc2-gke/`, `/engage/`

| Report | Perf | A11y | BP | SEO |
|--------|------|------|----|-----|
| desktop-home | 100 | 100 | 100 | 100 |
| mobile-home | 100 | 100 | 100 | 100 |
| desktop-outcomes-soc2-gke | 100 | 100 | 100 | 100 |
| mobile-outcomes-soc2-gke | 100 | 100 | 100 | 100 |
| desktop-engage | 100 | 100 | 100 | 100 |
| mobile-engage | 100 | 100 | 100 | 100 |

**No category gaps.** Category scores are all 100 — no residual justifications required.

### Informative / non-scoring notes (not score blockers)

| Audit | Notes |
|-------|-------|
| `network-dependency-tree-insight` | Insight-only; fonts self-hosted via `@fontsource-variable/*` |
| `lcp-lazy-loaded` (desktop outcomes) | Proof `<img>` is below the fold with `loading="lazy"`; LCP is typically the H1. Revisit if LCP element changes. |
| `uses-responsive-images` (partial) | WebP srcset 640w/1280w present; residual bytes may still appear as insight on mobile |

HTML/JSON reports: local `website/lighthouse-results/` (gitignored). Re-run with `npm run lighthouse`.

## Fixes applied to reach 100

1. Self-host fonts (removed Google Fonts CDN)
2. Fix `.nav a` specificity stealing primary CTA text color (contrast)
3. Brand accessible name matches visible SOLLABS text
4. Inline stylesheets (`build.inlineStylesheets: 'always'`)
5. Proof screenshots → WebP + responsive srcset
