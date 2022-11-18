// @ts-check
const { test, expect } = require("@playwright/test");

test("homepage has title and links to intro page", async ({ page }) => {
  await page.goto("/");
  const navbar = page.locator("data-testid=navbar");

  await expect(navbar).toContainText("Scida");
});
