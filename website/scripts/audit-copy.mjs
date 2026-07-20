#!/usr/bin/env node
/**
 * Firm-scale copy gate: inventory buyer-facing strings and fail on banlist.
 * See ~/.cursor/skills/firm-scale-copy-gate/SKILL.md
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const BUYER_GLOBS = [
  'src/site.config.ts',
  'src/layouts',
  'src/pages/index.astro',
  'src/pages/about.astro',
  'src/pages/engage.astro',
  'src/pages/services',
  'src/pages/outcomes',
  'src/pages/work',
];

const BANLIST = [
  { id: 'no-sales-layer', re: /no sales layer/i },
  { id: 'no-juniors', re: /no juniors|\bnot a junior\b/i },
  { id: 'no-handoffs', re: /no hand-?offs?/i },
  { id: 'you-get-me', re: /you get me\b|work directly with me\b/i },
  { id: 'principal-brand', re: /principal-led|the principal engineer|Speak directly with the principal/i },
  { id: 'agency-faq', re: /are you an agency/i },
  { id: 'agency-overhead', re: /without the agency overhead/i },
  { id: 'boutique-model-reach', re: /boutique model,\s*global reach/i },
  { id: 'boutique-consulting', re: /boutique consulting/i },
  { id: 'no-proposal-solo', re: /no proposal,\s*no pressure/i },
  // Composed CTAs — locked allowlist forbids “Learn more about X”
  { id: 'learn-more-about', re: /learn more about\b/i },
  { id: 'view-our-solutions', re: /view our solutions/i },
  { id: 'book-free-review', re: /book a free (architecture )?review/i },
  { id: 'schedule-a-briefing', re: /schedule a briefing/i },
  // Out.Cloud IDP product copy — Sol Labs sells consulting, not a platform product
  { id: 'idp-product-copy', re: /without filing a ticket|platforms your teams actually use/i },
  // Fabricated clients — Sol Labs has no paying customers yet; Kanto/Pulsys are in-house
  { id: 'implied-customers', re: /customer spotlight|our customers love|trusted by/i },
];

function walk(p, out = []) {
  const st = fs.statSync(p);
  if (st.isDirectory()) {
    for (const e of fs.readdirSync(p)) walk(path.join(p, e), out);
  } else if (/\.(ts|astro)$/.test(p)) out.push(p);
  return out;
}

function collectFiles() {
  const files = [];
  for (const g of BUYER_GLOBS) {
    const abs = path.join(root, g);
    if (!fs.existsSync(abs)) continue;
    if (fs.statSync(abs).isDirectory()) walk(abs, files);
    else files.push(abs);
  }
  return [...new Set(files)];
}

function extractStrings(file, text) {
  const found = new Set();
  const add = (s) => {
    s = s.replace(/\s+/g, ' ').trim();
    if (s.length < 6) return;
    if (/^(https?:|\/[a-z]|application\/|text\/|image\/|node:|@type|data-|class=)/i.test(s)) return;
    if (/^[a-zA-Z0-9_./:-]+$/.test(s) && !/\s/.test(s)) return;
    found.add(s);
  };
  const stringRe = /(?:'|")((?:\\.|[^\\'"]){6,})(?:'|")/g;
  const templateRe = /`((?:\\.|[^\\`]){6,})`/g;
  let m;
  while ((m = stringRe.exec(text))) add(m[1].replace(/\\'/g, "'").replace(/\\"/g, '"'));
  while ((m = templateRe.exec(text))) add(m[1]);
  if (file.endsWith('.astro')) {
    const body = text.replace(/^---[\s\S]*?---/, '');
    const jsxRe = />([^<>{}\n][^<>{}]{5,})</g;
    while ((m = jsxRe.exec(body))) add(m[1]);
  }
  return [...found];
}

const files = collectFiles();
const hits = [];
const inventory = [];

for (const file of files) {
  const rel = path.relative(root, file);
  const text = fs.readFileSync(file, 'utf8');
  for (const s of extractStrings(file, text)) {
    inventory.push({ file: rel, s });
    for (const ban of BANLIST) {
      if (ban.re.test(s)) hits.push({ file: rel, id: ban.id, s });
    }
  }
}

console.log(`audited ${files.length} files, ${inventory.length} buyer-facing strings`);
if (hits.length) {
  console.error(`\nFAIL: ${hits.length} banlist hit(s)\n`);
  for (const h of hits) {
    console.error(`[${h.id}] ${h.file}\n  ${h.s.slice(0, 240)}\n`);
  }
  process.exit(1);
}
console.log('PASS: zero banlist hits');
