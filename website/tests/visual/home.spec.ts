import { test, expect } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../../test-results/screenshots');

test.describe('home visual', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(600);
  });

  test('hero viewport', async ({ page }, testInfo) => {
    await expect(page.locator('.zen-hero')).toBeVisible();
    await expect(page.locator('#hero-title')).toHaveText('Platform Engineering');
    await expect(page.locator('.zen-hero .btn--primary').first()).toHaveText("Let's Talk");
    await expect(page.locator('.zen-hero .btn--ghost').first()).toHaveText('Learn more');
    await page.locator('.zen-hero').screenshot({
      path: path.join(OUT, testInfo.project.name, 'hero.png'),
    });
  });

  test('services section hierarchy', async ({ page }, testInfo) => {
    const capabilities = page.locator('#capabilities');
    await capabilities.scrollIntoViewIfNeeded();
    await expect(page.locator('#capabilities .challenge-item')).toHaveCount(4);
    await expect(page.locator('#capabilities .challenge-item__service').nth(0)).toHaveText(
      'Platform Engineering',
    );
    await expect(page.locator('#capabilities .challenge-item__service').nth(1)).toHaveText(
      'GKE SOC 2 Readiness',
    );
    await expect(page.locator('#capabilities .challenge-item__service').nth(2)).toHaveText(
      'AI Infrastructure',
    );
    await expect(page.locator('#capabilities .challenge-item__service').nth(3)).toHaveText(
      'Application Development on Google Cloud',
    );
    await expect(page.locator('#capabilities .challenge-item__more')).toHaveCount(4);
    await expect(page.locator('.proof-card')).toHaveCount(3);
    await expect(page.getByText('In-house project · Slerp · On-device AI inference')).toBeVisible();
    await capabilities.screenshot({
      path: path.join(OUT, testInfo.project.name, 'outcomes.png'),
    });
  });

  test('labs section', async ({ page }, testInfo) => {
    const labs = page.locator('#proof-title').locator('..');
    await labs.scrollIntoViewIfNeeded();
    await expect(page.locator('.proof-card')).toHaveCount(3);
    await labs.screenshot({
      path: path.join(OUT, testInfo.project.name, 'labs.png'),
    });
  });

  test('method section', async ({ page }, testInfo) => {
    const method = page.locator('.method-list');
    await method.scrollIntoViewIfNeeded();
    await expect(method.locator('li')).toHaveCount(3);
    await page.screenshot({
      path: path.join(OUT, testInfo.project.name, 'mid-page.png'),
    });
  });

  test('full page', async ({ page }, testInfo) => {
    await page.screenshot({
      path: path.join(OUT, testInfo.project.name, 'full-page.png'),
      fullPage: true,
    });
  });

  test('Pulsys case study', async ({ page }, testInfo) => {
    await page.goto('./work/pulsys/');
    await expect(page.locator('.case-study__hero img')).toBeVisible();
    await page.screenshot({
      path: path.join(OUT, testInfo.project.name, 'case-study-pulsys.png'),
      fullPage: true,
    });
  });

  test('services page catalog', async ({ page }, testInfo) => {
    await page.goto('./services/');
    await expect(page.locator('#solutions-title')).toHaveText('Our services');
    await expect(page.locator('.solutions__offer')).toHaveCount(4);
    await expect(page.locator('.solutions__offer-pain')).toHaveCount(0);
    await expect(page.getByText('In-house project · Kanto')).toBeVisible();
    await expect(page.getByText('In-house project · Pulsys')).toBeVisible();
    await expect(page.getByText('Customer Spotlight')).toHaveCount(0);
    await page.locator('.page-hero').screenshot({
      path: path.join(OUT, testInfo.project.name, 'services-hero.png'),
    });
    await page.locator('.solutions__offer').first().screenshot({
      path: path.join(OUT, testInfo.project.name, 'services-offer-01.png'),
    });
    await page.screenshot({
      path: path.join(OUT, testInfo.project.name, 'services.png'),
      fullPage: true,
    });
  });

  const servicePages = [
    'platform-engineering',
    'gke-soc2-readiness',
    'ai-infrastructure',
    'application-development',
    'private-vj-inference',
  ];
  for (const slug of servicePages) {
    test(`service page: ${slug}`, async ({ page }, testInfo) => {
      await page.goto(`./services/${slug}/`);
      await expect(page.locator('.page-hero__title')).toBeVisible();
      await expect(page.locator('.page-hero .btn--primary')).toBeVisible();
      await page.screenshot({
        path: path.join(OUT, testInfo.project.name, `service-${slug}.png`),
        fullPage: true,
      });
    });
  }

  const allPages: [string, string][] = [
    ['home', './'],
    ['services-index', './services/'],
    ['about', './about/'],
    ['engage', './engage/'],
    ['blog-index', './blog/'],
    ['blog-soc2-gke-series-b', './blog/soc2-gke-series-b/'],
    ['blog-vj-trust-local-audio', './blog/vj-trust-local-audio/'],
    ['blog-vllm-hf-gpu-idle', './blog/vllm-hf-gpu-idle/'],
    ['blog-gemini-no-api-keys-org-policy', './blog/gemini-no-api-keys-org-policy/'],
    ['blog-zero-trust-gitops-gke-connect', './blog/zero-trust-gitops-gke-connect/'],
    ['work-kanto', './work/kanto/'],
    ['work-pulsys', './work/pulsys/'],
    ['work-slerp', './work/slerp/'],
  ];
  for (const [name, url] of allPages) {
    test(`page: ${name}`, async ({ page }, testInfo) => {
      await page.goto(url);
      await page.waitForLoadState('networkidle');
      await expect(page.locator('h1').first()).toBeVisible();
      await page.screenshot({
        path: path.join(OUT, testInfo.project.name, `page-${name}.png`),
        fullPage: true,
      });
    });
  }

  test('outcome and blog routes', async ({ page }) => {
    await page.goto('./outcomes/');
    await expect(page).toHaveURL(/\/services\/?$/);
    await page.goto('./services/gke-soc2-readiness/');
    await expect(page.locator('h1')).toContainText('GKE SOC 2 Readiness');
    await page.goto('./services/platform-engineering/');
    await expect(page.locator('h1')).toContainText('Platform Engineering');
    await page.goto('./work/pulsys/');
    await expect(page.locator('h1')).toContainText('AI infrastructure cost');
    await page.goto('./engage/');
    await expect(page.locator('h1')).toHaveText('Contact Us');
  });
});
