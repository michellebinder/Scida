const { test, expect } = require("@playwright/test");
const assert = require("assert");

test("redirections check with dekanat", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByPlaceholder("mmuster1 / mmuster1@test.de ").click();
  await page.getByPlaceholder("mmuster1 / mmuster1@test.de ").type("dekanat@test.de");
  await page.getByPlaceholder("Passwort").click();
  await page.getByPlaceholder("Passwort").type("123test");
  //Test for Login
  await page.getByRole("button", { name: "Einloggen" }).click();
  await page.waitForNavigation();
  let currentUrl = page.url();
  assert.strictEqual(currentUrl,"http://localhost:3000/dashboard/","Login went wrong");
  //Tests for Redirection to Accounts
  await page.getByRole('link', { name: 'Accounts verwalten Verwalten Sie hier die Accounts von Studierenden, Dozierenden und Mitarbeitenden.' }).click();
  await page.waitForNavigation();
  currentUrl = page.url();
  assert.strictEqual(currentUrl,"http://localhost:3000/accounts/","Redirection to attendance went wrong");
  //Tests for Redirection to csvAdmin
  await page.goto("http://localhost:3000/dashboard/");
  await page.getByRole('link', { name: 'CSV hochladen Laden Sie hier CSV-Dateien der Blockpraktika hoch. Sie werden automatisch in das System eingepflegt.' }).click();
  await page.waitForNavigation();
  currentUrl = page.url();
  assert.strictEqual(currentUrl,"http://localhost:3000/csvAdmin/","Redirection to csvAdmin went wrong");
  //Tests for Redirection to courseList
  await page.goto("http://localhost:3000/dashboard/");
  await page.getByRole('link', { name: 'Praktika Hier finden Sie eine Übersicht aller Praktika, die aktuell im System eingetragen sind.' }).click();
  await page.waitForNavigation();
  currentUrl = page.url();
  assert.strictEqual(currentUrl,"http://localhost:3000/courseList/","Redirection to courseList went wrong");
  //Tests for Redirection to downloadPDF
  await page.goto("http://localhost:3000/dashboard/");
  await page.getByRole('link', { name: 'Ausdrucke Laden Sie sich hier Anwesenheitslisten herunter.' }).click();
  await page.waitForNavigation();
  currentUrl = page.url();
  assert.strictEqual(currentUrl,"http://localhost:3000/downloadPDF/","Redirection to downloadPDF went wrong");
});

test("redirections check with dekanat sandwichMenu", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByPlaceholder("mmuster1 / mmuster1@test.de ").click();
  await page.getByPlaceholder("mmuster1 / mmuster1@test.de ").type("dekanat@test.de");
  await page.getByPlaceholder("Passwort").click();
  await page.getByPlaceholder("Passwort").type("123test");
  //Test for Login
  await page.getByRole("button", { name: "Einloggen" }).click();
  await page.waitForNavigation();
  let currentUrl = page.url();
  assert.strictEqual(currentUrl,"http://localhost:3000/dashboard/","Login went wrong");
  //Test for redirection through sandwich to accounts
  await page.locator('li > a > .btn').first().click();
  await page.waitForNavigation();
  currentUrl = page.url();
  assert.strictEqual(currentUrl,"http://localhost:3000/accounts/","Redirection to attendance went wrong");
  //Test for redirection through sandwich to csvAdmin
  await page.goto("http://localhost:3000/dashboard/");
  await page.locator('li:nth-child(2) > a > .btn').click();
  await page.waitForNavigation();
  currentUrl = page.url();
  assert.strictEqual(currentUrl,"http://localhost:3000/csvAdmin/","Redirection to csvAdmin went wrong");
  //Test for redirection through sandwich to courseList
  await page.goto("http://localhost:3000/dashboard/");
  await page.locator('li:nth-child(3) > a > .btn').click();
  await page.waitForNavigation();
  currentUrl = page.url();
  assert.strictEqual(currentUrl,"http://localhost:3000/courseList/","Redirection to courseList went wrong");
  //Test for redirection through sandwich to downloadPDF
  await page.goto("http://localhost:3000/dashboard/");
  await page.locator('li:nth-child(4) > a > .btn').click();
  await page.waitForNavigation();
  currentUrl = page.url();
  assert.strictEqual(currentUrl,"http://localhost:3000/downloadPDF/","Redirection to downloadPDF went wrong");
  //Test for redirection through sandwich to dashboard
  await page.locator('a > .btn').first().click();
  currentUrl = page.url();
  assert.strictEqual(currentUrl,"http://localhost:3000/dashboard/","Redirection to dashboard went wrong");

});