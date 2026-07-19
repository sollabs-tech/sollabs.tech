/**
 * Capture product landing screenshots into public/proof/.
 * Run: node scripts/capture-proof.mjs
 * Requires: npx playwright install chromium (after npm ci)
 */
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../public/proof');

const targets = [
  { slug: 'soc2-gke', url: 'https://kanto.ai' },
  { slug: 'model-cache-cost', url: 'https://pulsys.io' },
  { slug: 'private-vj-inference', url: 'https://slerp.audio' },
];

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1280, height: 800 },
  colorScheme: 'dark',
});

for (const t of targets) {
  const dest = path.join(outDir, `${t.slug}.png`);
  try {
    await page.goto(t.url, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: dest, fullPage: false });
    console.log('wrote', dest);
  } catch (err) {
    console.warn('failed', t.url, err.message);
  }
}

await browser.close();
