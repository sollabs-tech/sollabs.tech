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
    await expect(page.locator('.lp-hero')).toBeVisible();
    await expect(page.locator('.brand .brand__word')).toBeVisible();
    await page.locator('.lp-hero').screenshot({
      path: path.join(OUT, testInfo.project.name, 'hero.png'),
    });
  });

  test('capabilities section', async ({ page }, testInfo) => {
    const capabilities = page.locator('#capabilities');
    await capabilities.scrollIntoViewIfNeeded();
    await expect(page.locator('.outcome-link')).toHaveCount(3);
    await capabilities.screenshot({
      path: path.join(OUT, testInfo.project.name, 'outcomes.png'),
    });
  });

  test('method and faq', async ({ page }, testInfo) => {
    const method = page.locator('.method-list');
    await method.scrollIntoViewIfNeeded();
    await expect(method.locator('li')).toHaveCount(3);
    const faq = page.locator('.faq');
    await faq.scrollIntoViewIfNeeded();
    await expect(faq.locator('details')).toHaveCount(4);
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

  test('outcome and blog routes', async ({ page }) => {
    await page.goto('./outcomes/gke-platform/');
    await expect(page.locator('h1')).toContainText('GKE');
    await page.goto('./blog/vllm-hf-gpu-idle/');
    await expect(page.locator('h1')).toContainText('Hugging Face');
    await page.goto('./engage/');
    await expect(page.locator('h1')).toBeVisible();
  });
});
