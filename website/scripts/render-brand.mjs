// Render brand PNGs from inline SVG. Run after changing the mark:
//   node scripts/render-brand.mjs
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pub = path.join(__dirname, '../public');
const brandDir = path.join(pub, 'brand');

// Light consulting palette — GCP-adjacent blue and navy ink.
const ACCENT = '#0B57D0';
const BG = '#0B1F33';
const INK = '#F4F6F9';
const MARK_INK = '#0B1F33';

/** SL monogram in a precision lab-plate frame (32×32 grid). */
const markInner = (ink) => `
  <rect x="3" y="3" width="26" height="26" fill="none" stroke="${ink}" stroke-width="1.25" rx="1"/>
  <path d="M6 6 H10 M22 6 H26 M6 26 H10 M22 26 H26" stroke="${ink}" stroke-width="1.25" stroke-linecap="square"/>
  <text x="16" y="21.5" text-anchor="middle" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
    font-weight="600" font-size="13" fill="${ink}" letter-spacing="0.5">SL</text>
`;

const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 32 32">${markInner(MARK_INK)}</svg>`;

const avatarSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="${BG}"/>
  <g transform="translate(96 96) scale(10)">${markInner(INK)}</g>
</svg>`;

const touchSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="${BG}"/>
  <g transform="translate(26 26) scale(4)">${markInner(INK)}</g>
</svg>`;

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="${BG}"/>
  ${markInner(INK)}
</svg>`;

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#F4F6F9"/>
  <g transform="translate(96 190) scale(7)">${markInner(MARK_INK)}</g>
  <text x="360" y="300" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-weight="600"
    font-size="92" fill="${MARK_INK}" letter-spacing="4">SOL</text>
  <text x="560" y="300" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-weight="600"
    font-size="92" fill="#3D5266" letter-spacing="4">LABS</text>
  <text x="96" y="420" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="36"
    fill="#3D5266">Google Cloud that ships.</text>
  <rect x="96" y="460" width="120" height="6" fill="${ACCENT}"/>
</svg>`;

await mkdir(brandDir, { recursive: true });
await writeFile(path.join(brandDir, 'mark.svg'), markSvg);
await writeFile(path.join(pub, 'favicon.svg'), faviconSvg);

await sharp(Buffer.from(avatarSvg)).png().toFile(path.join(brandDir, 'github-avatar-512.png'));
await sharp(Buffer.from(touchSvg)).png().toFile(path.join(pub, 'apple-touch-icon.png'));
await sharp(Buffer.from(ogSvg)).png().toFile(path.join(pub, 'og.png'));

for (const size of [16, 32, 48, 180, 512]) {
  await sharp(Buffer.from(faviconSvg), { density: (72 * size) / 32 })
    .resize(size, size)
    .png()
    .toFile(path.join(pub, `favicon-${size}.png`));
}

console.log('brand assets written: brand/mark.svg, brand/github-avatar-512.png, favicons, og.png');
