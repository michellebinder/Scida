// @ts-check
const { test, expect } = require("@playwright/test");

test("navbar contains title and links to intro page", async ({ page }) => {
  await page.goto("/");
  const navbar = page.locator("data-testid=navbar");

  await expect(navbar).toContainText("Scida");
  await expect(navbar).toContainText("Medizinische Fakultät - Universität zu Köln");
});

test("navbar contains logo", async ({ page }) => {
  await page.goto("/");
  const navbar = page.locator("data-testid=img");
  await page.isVisible("img")
});

test("footer contains right text and links to corresponding pages", async ({ page }) => {

  // TODO: fix text check (at the moment they somehow pass with any text)
  page.locator('footer', { hasText: '© 2022 Scida.' });
  page.locator('footer', { hasText: 'Alle Rechte vorbehalten.' });
  
  page.locator('footer', { hasText: 'Support' });
  await page.goto('/support');
  
  page.locator('footer', { hasText: 'Datenschutz' });
  await page.goto('/datenschutz');

  page.locator('footer', { hasText: 'Impressum' });
  await page.goto('/impressum');
});
