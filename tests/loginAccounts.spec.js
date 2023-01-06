// @ts-check
const { test, expect } = require("@playwright/test");


{
  /* LOGIN-ACCOUNTS TESTS */
}
test('login with student test account', async ({ page }) => {
  await page.goto('https://2793-134-95-7-150.eu.ngrok.io/');
  await page.getByRole('button', { name: 'Visit Site' }).click();
  await page.goto('https://2793-134-95-7-150.eu.ngrok.io/');
  await page.getByPlaceholder('mmuster1 / mmuster1@test.de ').click();
  await page.getByPlaceholder('mmuster1 / mmuster1@test.de ').type('studierende@test.de');
  await page.getByPlaceholder('Passwort').click();
  await page.getByPlaceholder('Passwort').type('123test');
  await page.getByRole('button', { name: 'Einloggen' }).click();
  await page.getByRole('heading', { name: 'Hallo Studierende!' }).click();
  await page.getByRole('button', { name: 'Logout' }).click();
});

test('login with dozent test account', async ({ page }) => {
  await page.goto('https://2793-134-95-7-150.eu.ngrok.io/');
  await page.getByRole('button', { name: 'Visit Site' }).click();
  await page.goto('https://2793-134-95-7-150.eu.ngrok.io/');
  await page.getByPlaceholder('mmuster1 / mmuster1@test.de ').click();
  await page.getByPlaceholder('mmuster1 / mmuster1@test.de ').type('dozierende@test.de');
  await page.getByPlaceholder('Passwort').click();
  await page.getByPlaceholder('Passwort').type('123test');
  await page.getByRole('button', { name: 'Einloggen' }).click();
  await page.getByRole('heading', { name: 'Hallo Dozierende!' }).click();
  await page.getByRole('button', { name: 'Logout' }).click();
});

test('login with dekanat test account', async ({ page }) => {
  await page.goto('https://2793-134-95-7-150.eu.ngrok.io/');
  await page.getByPlaceholder('mmuster1 / mmuster1@test.de ').click();
  await page.getByPlaceholder('mmuster1 / mmuster1@test.de ').type('dekanat@test.de');
  await page.getByPlaceholder('Passwort').click();
  await page.getByPlaceholder('Passwort').type('123test');
  await page.getByRole('button', { name: 'Einloggen' }).click();
  await page.getByRole('heading', { name: 'Hallo Dekanat!' }).click();
  await page.getByRole('button', { name: 'Logout' }).click();
});