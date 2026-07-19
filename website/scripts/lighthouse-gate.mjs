#!/usr/bin/env node
/** Build is done by npm run lighthouse. Start preview, run LH, exit. */
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const PORT = process.env.PLAYWRIGHT_PORT ?? '4391';
const url = `http://127.0.0.1:${PORT}/`;

const preview = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', PORT], {
  stdio: ['ignore', 'pipe', 'pipe'],
  shell: process.platform === 'win32',
});

let ready = false;
const onData = (buf) => {
  const s = buf.toString();
  process.stdout.write(s);
  if (/localhost|127\.0\.0\.1|Local/i.test(s)) ready = true;
};

preview.stdout.on('data', onData);
preview.stderr.on('data', onData);

for (let i = 0; i < 60 && !ready; i++) await sleep(500);

// Even if banner missed, try fetch
for (let i = 0; i < 20 && !ready; i++) {
  try {
    const res = await fetch(url);
    if (res.ok) ready = true;
  } catch {
    await sleep(500);
  }
}

if (!ready) {
  preview.kill('SIGTERM');
  console.error('Preview server failed to start');
  process.exit(1);
}

const lh = spawn('node', ['scripts/lighthouse.mjs'], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env: { ...process.env, PREVIEW_URL: url },
});

lh.on('exit', (code) => {
  preview.kill('SIGTERM');
  process.exit(code ?? 1);
});
