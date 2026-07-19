# Sol Labs brand mark

Direction: laboratory stamp (SL monogram in a precision frame).  
References: FedEx syllable hinge (structure) + Stripe/Airbnb accent scarcity (color roles) + instrument/lab plate geometry (not Solana sun/orb).

## Anti-Solana test

Must fail at 32px and 512px: no purple/magenta/neon green, no gradient orb, no sun rays, no three-bar S.

## Wordmark

**SOLLABS** — FedEx hinge + Stripe/Airbnb color scarcity.

| Attribute | Value | Reference / evidence |
|---|---|---|
| Structure | `SOL` + `LABS` (no word space in lockup) | FedEx syllable hinge |
| Weight | 600 throughout | Hinge is color/value, not weight |
| Tracking | `0.04em` overall | Even rhythm (Beachy / fashion display) |
| L→L optical | default metrics OK; open only if screenshots show clash | Adobe optical kerning practice |
| Colors | SOL = `--color-label`; LABS = `--color-label-secondary` | Stripe near-mono; accent reserved for CTA |
| CTA | `--color-accent` (oxide amber) only on actions | Identity ≠ action color in the same header |

Do **not** put oxide amber on both LABS and the header CTA. Do **not** use a weight split as the hinge.

Prose / legal copy says **Sol Labs** (sentence case, two words). The logo lockup is the hinged compound.

## Palette

| Token | Value | Role |
|---|---|---|
| Ground | `#0E1210` | Dark ink |
| Label | `#F2F0EA` | Primary type |
| Label secondary | `#9A968C` | Hinge / secondary |
| Accent | `#C4A35A` | CTA only (oxide amber) |
| Accent hover | `#D4B56E` | CTA hover |

## Source of truth

| File | Use |
|---|---|
| `website/public/brand/mark.svg` | Mark |
| `website/public/brand/github-avatar-512.png` | GitHub org avatar |
| `website/scripts/render-brand.mjs` | Rebuild rasters |

## Rebuild

```bash
cd website && node scripts/render-brand.mjs
```
