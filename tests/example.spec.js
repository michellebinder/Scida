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

// test("navbar contains link to intro page", async ({ page }) => {
//   await page.goto("/");
//   const navbar = page.locator("data-testid=navbar");

//   await expect(navbar).toContainText("Scida");
// });
