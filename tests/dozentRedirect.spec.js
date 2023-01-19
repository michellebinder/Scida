const { test, expect } = require("@playwright/test");
const { isAssetError } = require("next/dist/client/route-loader");
const assert = require('assert');
const { current } = require("tailwindcss/colors");
const delay = ms => new Promise(res => setTimeout(res, ms));

test('redirections check with dozent', async ({ page }) => {
    //Test for Login
    await page.goto('http://localhost:3000/');
    await page.getByPlaceholder('mmuster1 / mmuster1@test.de ').click();
    await page.getByPlaceholder('mmuster1 / mmuster1@test.de ').type('dozierende@test.de');
    await page.getByPlaceholder('Passwort').click();
    await page.getByPlaceholder('Passwort').type('123test');
    await page.getByRole('button', { name: 'Einloggen' }).click();
    await page.waitForNavigation();
    let currentUrl = page.url();
    assert.strictEqual(currentUrl, 'http://localhost:3000/dashboard/', 'Login went wrong');
    //Test for Redirection to CourseList
    await page.getByRole('link', { name: 'Hier finden Sie eine Übersicht über alle Ihre Blockpraktika.' }).click();
    await page.waitForNavigation();
    currentUrl = page.url();
    assert.strictEqual(currentUrl,"http://localhost:3000/courseList/","Redirection to courseList went wrong");
    await page.goto('http://localhost:3000/dashboard/');
    // Test for Redirections to downlaod PDF when available
    // await page.getByRole('link', { name: 'Ausdrucke Drucke dir die Anwesenheitslisten für deine Praktika aus.' }).click();
    // await page.waitForNavigation();
    // currentUrl = page.url();
    // assert.strictEqual(currentUrl,"http://localhost:3000/downloadPDF/","Redirection to downloadPDF went wrong");
});

test('redirections check with dozent sandwichMenu', async ({ page }) => {
    //Test for Login
    await page.goto('http://localhost:3000/');
    await page.getByPlaceholder('mmuster1 / mmuster1@test.de ').click();
    await page.getByPlaceholder('mmuster1 / mmuster1@test.de ').type('dozierende@test.de');
    await page.getByPlaceholder('Passwort').click();
    await page.getByPlaceholder('Passwort').type('123test');
    await page.getByRole('button', { name: 'Einloggen' }).click();
    await page.waitForNavigation();
    let currentUrl = page.url();
    assert.strictEqual(currentUrl, 'http://localhost:3000/dashboard/', 'Login went wrong');
    //Test for Redirection to CourseList
    await page.locator('[id="__next"]').getByRole('button').nth(2).click();
    await page.waitForNavigation();
    currentUrl = page.url();
    assert.strictEqual(currentUrl,"http://localhost:3000/courseList/","Redirection to courseList went wrong");
    // Test for Redirections to downlaod PDF when available
    // await page.goto('http://localhost:3000/dashboard/');
    // await page.locator('[id="__next"]').getByRole('button').nth(3).click();
    // await page.waitForNavigation();
    // currentUrl = page.url();
    // assert.strictEqual(currentUrl,"http://localhost:3000/downloadPDF/","Redirection to downloadPDF went wrong");
    await page.locator('a > .btn').first().click();
    currentUrl = page.url();
    assert.strictEqual(currentUrl,"http://localhost:3000/dashboard/","Redirection to dashboard went wrong");
});