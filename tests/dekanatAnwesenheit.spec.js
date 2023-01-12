const { test, expect } = require("@playwright/test");
const assert = require('assert');

test('go to attendance with dekanat', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByPlaceholder('mmuster1 / mmuster1@test.de ').click();
    await page.getByPlaceholder('mmuster1 / mmuster1@test.de ').type('dekanat@test.de');
    await page.getByPlaceholder('Passwort').click();
    await page.getByPlaceholder('Passwort').type('123test');
    await page.getByRole('button', { name: 'Einloggen' }).click();
    await page.waitForNavigation();
    let currentUrl = page.url();
    assert.strictEqual(currentUrl, 'http://localhost:3000/dashboard/', 'Login went wrong');
    await page.getByRole('link', { name: 'Accounts verwalten Verwalte hier die Accounts von Studierenden, Dozierenden und Mitarbeitenden.' }).click();
    await page.waitForNavigation();
    currentUrl = page.url();
    assert.strictEqual(currentUrl, 'http://localhost:3000/accountsDekanat/', 'Redirection to attendance went wrong');
    await page.locator('#firstName').click();
    await page.locator('#firstName').fill('Play');
    await page.locator('#lastName').click();
    await page.locator('#lastName').fill('Wright');
    await page.locator('#email').click();
    await page.locator('#email').fill('playwright@test.de');
    await page.locator('#role').selectOption('Sekretariat');
    await page.getByRole('button', { name: 'Nutzenden erstellen' }).click();
});