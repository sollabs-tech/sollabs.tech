import { defineConfig } from 'astro/config';

const site = process.env.PUBLIC_SITE_URL ?? 'https://sollabs.tech';
const base = process.env.PUBLIC_BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  compressHTML: true,
  redirects: {
    // "Outcomes" is internal strategy language — never customer-facing. Services
    // live under /services/. Keep legacy /outcomes/* redirecting for any links.
    '/outcomes/platform-engineering': '/services/platform-engineering/',
    '/outcomes/platform-engineering/': '/services/platform-engineering/',
    '/outcomes/gke-soc2-readiness': '/services/gke-soc2-readiness/',
    '/outcomes/gke-soc2-readiness/': '/services/gke-soc2-readiness/',
    '/outcomes/ai-infrastructure': '/services/ai-infrastructure/',
    '/outcomes/ai-infrastructure/': '/services/ai-infrastructure/',
    '/outcomes/private-vj-inference': '/services/private-vj-inference/',
    '/outcomes/private-vj-inference/': '/services/private-vj-inference/',
    '/outcomes/gke-platform': '/services/gke-soc2-readiness/',
    '/outcomes/gke-platform/': '/services/gke-soc2-readiness/',
    '/outcomes/model-cache-cost': '/services/ai-infrastructure/',
    '/outcomes/model-cache-cost/': '/services/ai-infrastructure/',
    '/work/kanto': '/services/platform-engineering/',
    '/work/kanto/': '/services/platform-engineering/',
    '/services/gcp-cloud-foundation': '/services/platform-engineering/',
    '/services/gcp-cloud-foundation/': '/services/platform-engineering/',
  },
  build: {
    // Tiny CSS bundle — inline to remove render-blocking stylesheet round-trip (Lighthouse mobile).
    inlineStylesheets: 'always',
  },
});
