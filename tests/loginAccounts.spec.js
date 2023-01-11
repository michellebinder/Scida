// @ts-check
const { test, expect } = require("@playwright/test");
const { isAssetError } = require("next/dist/client/route-loader");
const assert = require('assert');
const { current } = require("tailwindcss/colors");


{
  /* LOGIN-ACCOUNTS TESTS */
}
test('login with student test account', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByPlaceholder('mmuster1 / mmuster1@test.de ').click();
  await page.getByPlaceholder('mmuster1 / mmuster1@test.de ').type('studierende@test.de');
  await page.getByPlaceholder('Passwort').click();
  await page.getByPlaceholder('Passwort').type('123test');
  await page.getByRole('button', { name: 'Einloggen' }).click();
  await page.waitForNavigation();
  let currentUrl = page.url();
  assert.strictEqual(currentUrl, 'http://localhost:3000/dashboard/', 'Login went wrong');
  await page.getByRole('button', { name: 'Logout' }).click();
  // await page.waitForNavigation();
  // currentUrl = page.url();
  // assert.strictEqual(currentUrl, 'http://localhost:3000/', 'Logout went wrong');
});

test('login with dozent test account', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByPlaceholder('mmuster1 / mmuster1@test.de ').click();
  await page.getByPlaceholder('mmuster1 / mmuster1@test.de ').type('dozierende@test.de');
  await page.getByPlaceholder('Passwort').click();
  await page.getByPlaceholder('Passwort').type('123test');
  await page.getByRole('button', { name: 'Einloggen' }).click();
  await page.waitForNavigation();
  let currentUrl = page.url();
  assert.strictEqual(currentUrl, 'http://localhost:3000/dashboard/', 'Login went wrong');
  await page.getByRole('button', { name: 'Logout' }).click();
});

test('login with dekanat test account', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByPlaceholder('mmuster1 / mmuster1@test.de ').click();
  await page.getByPlaceholder('mmuster1 / mmuster1@test.de ').type('dekanat@test.de');
  await page.getByPlaceholder('Passwort').click();
  await page.getByPlaceholder('Passwort').type('123test');
  await page.getByRole('button', { name: 'Einloggen' }).click();
  await page.waitForNavigation();
  let currentUrl = page.url();
  assert.strictEqual(currentUrl, 'http://localhost:3000/dashboard/', 'Login went wrong');
  await page.getByRole('button', { name: 'Logout' }).click();
});