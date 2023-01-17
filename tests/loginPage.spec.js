// @ts-check
const { test, expect } = require("@playwright/test");


{
  /* LOGIN PAGE TESTS */
}

test("navbar contains title, logo and links to intro page", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("img").click();
  await page.getByRole("link", {name: "Scida Medizinische Fakultät - Universität zu Köln",}).click();
  await page.getByTestId('navbar').click();
});

test("footer contains correct text and links to corresponding pages", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("contentinfo").click();
  await page.getByText("© 2023 Scida. Alle Rechte vorbehalten.").click();
  await page.getByText("|").first().click();
  await page.getByRole('link', { name: 'Support' }).click();
  await page.getByText("|").nth(1).click();
  await page.getByRole("link", { name: "Datenschutz" }).click();
  await page.getByText("|").nth(2).click();
  await page.getByRole("link", { name: "Impressum" }).click();
});

test("login window contains all components", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/");
    await page.getByText('Benutzername / Email').click();
    await page.getByPlaceholder('mmuster1 / mmuster1@test.de ').click();
    await page.getByPlaceholder('Passwort').click();
    await page.locator('span').filter({ hasText: 'Passwort vergessen?' }).click();
    await page.getByText('Schließen').click();
    await page.goto("http://localhost:3000/");
    await page.getByRole('button', { name: 'Einloggen' }).click();
    await page.getByText('Zugangsdaten falsch').click();
  });