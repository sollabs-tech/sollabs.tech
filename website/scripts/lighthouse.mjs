#!/usr/bin/env node
/**
 * Lighthouse desktop + mobile gate (lighthouse-100 skill).
 * Usage (preview must already be serving):
 *   PREVIEW_URL=http://127.0.0.1:4391/ node scripts/lighthouse.mjs
 * Or via npm run lighthouse (builds, previews, runs).
 */
import { spawn } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'lighthouse-results');
const baseUrl = process.env.PREVIEW_URL ?? 'http://127.0.0.1:4391/';
const routes = (process.env.LH_ROUTES ?? '/,/outcomes/gke-platform/,/engage/')
  .split(',')
  .map((r) => r.trim())
  .filter(Boolean);

await mkdir(outDir, { recursive: true });

function run(bin, binArgs) {
  return new Promise((resolve, reject) => {
    const child = spawn(bin, binArgs, {
      stdio: 'inherit',
      cwd: root,
      shell: process.platform === 'win32',
      env: process.env,
    });
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${bin} exited ${code}`))));
  });
}

function labelFor(route) {
  if (route === '/' || route === '') return 'home';
  return route.replace(/^\/+|\/+$/g, '').replace(/\//g, '-') || 'home';
}

async function lighthouse(formFactor, pageUrl, label) {
  const outputPath = path.join(outDir, `${formFactor}-${label}`);
  const binArgs = [
    'lighthouse',
    pageUrl,
    '--chrome-flags=--headless --no-sandbox --disable-gpu',
    '--only-categories=performance,accessibility,best-practices,seo',
    '--output=json',
    '--output=html',
    `--output-path=${outputPath}`,
    '--quiet',
  ];
  if (formFactor === 'desktop') binArgs.push('--preset=desktop');
  else binArgs.push('--form-factor=mobile', '--screenEmulation.mobile');
  console.log(`\n→ ${formFactor} ${pageUrl}`);
  await run('npx', binArgs);
  return `${outputPath}.report.json`;
}

const reports = [];
for (const route of routes) {
  const pageUrl = new URL(route, baseUrl).href;
  const label = labelFor(route);
  reports.push(await lighthouse('desktop', pageUrl, label));
  reports.push(await lighthouse('mobile', pageUrl, label));
}

const rows = [];
let allHundred = true;
for (const file of reports) {
  const json = JSON.parse(await readFile(file, 'utf8'));
  const form = json.configSettings?.formFactor ?? '?';
  const requested = path.basename(file).replace('.report.json', '');
  const cats = json.categories;
  const scores = {
    performance: Math.round((cats.performance?.score ?? 0) * 100),
    accessibility: Math.round((cats.accessibility?.score ?? 0) * 100),
    'best-practices': Math.round((cats['best-practices']?.score ?? 0) * 100),
    seo: Math.round((cats.seo?.score ?? 0) * 100),
  };
  for (const [k, v] of Object.entries(scores)) {
    if (v < 100) allHundred = false;
  }
  const failed = Object.entries(json.audits)
    .filter(([, a]) => a.score !== null && a.score < 1 && a.scoreDisplayMode !== 'informative' && a.scoreDisplayMode !== 'manual' && a.scoreDisplayMode !== 'notApplicable')
    .filter(([, a]) => {
      // Keep audits that affect the four categories
      return true;
    })
    .sort((a, b) => (a[1].score ?? 0) - (b[1].score ?? 0))
    .slice(0, 12)
    .map(([id, a]) => `${id} (${a.score})`);

  rows.push({ requested, form, scores, failed });
}

const summary = [
  '# Lighthouse summary',
  '',
  `| Report | Perf | A11y | BP | SEO |`,
  `|--------|------|------|----|-----|`,
  ...rows.map(
    (r) =>
      `| ${r.requested} | ${r.scores.performance} | ${r.scores.accessibility} | ${r.scores['best-practices']} | ${r.scores.seo} |`
  ),
  '',
  allHundred
    ? 'All measured categories are **100**.'
    : 'Gaps remain — see failing audits below and `JUSTIFICATIONS.md` if intentional.',
  '',
  '## Top failing audits',
  '',
  ...rows.flatMap((r) => [
    `### ${r.requested}`,
    ...(r.failed.length ? r.failed.map((f) => `- ${f}`) : ['- (none with score < 1 in top slice)']),
    '',
  ]),
].join('\n');

await writeFile(path.join(outDir, 'SUMMARY.md'), summary);
console.log(`\n${summary}`);
if (!allHundred) process.exitCode = 1;
