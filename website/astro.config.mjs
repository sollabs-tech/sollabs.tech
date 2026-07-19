import { defineConfig } from 'astro/config';

// Local default: root. CI sets PUBLIC_BASE_PATH=/sollabs.tech/ until custom domain is verified.
const site = process.env.PUBLIC_SITE_URL ?? 'https://sollabs.tech';
const base = process.env.PUBLIC_BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  compressHTML: true,
  build: {
    // Tiny CSS bundle — inline to remove render-blocking stylesheet round-trip (Lighthouse mobile).
    inlineStylesheets: 'always',
  },
});
