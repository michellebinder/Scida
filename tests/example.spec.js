// @ts-check
const { test, expect } = require("@playwright/test");

{/* LOGIN-PAGE TESTS */}

test('navbar contains title, logo and links to intro page', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('img').click();
  await page.getByRole('link', { name: 'Scida Medizinische Fakultät - Universität zu Köln' }).click();
  await page.getByRole('img').click();
});

test('footer contains correct text and links to corresponding pages', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('contentinfo').click();
  await page.getByText('© 2022 Scida. Alle Rechte vorbehalten.').click();
  await page.getByText('|').first().click();
  await page.getByRole('link', { name: 'Support' }).click();
  await page.getByText('|').nth(1).click();
  await page.getByRole('link', { name: 'Datenschutz' }).click();
  await page.getByText('|').nth(2).click();
  await page.getByRole('link', { name: 'Impressum' }).click();
});

test('login-form is correctly displayed for students, teachers and admins  ', async ({ page }) => {
  await page.goto('http://localhost:3000/#');
  await page.getByRole('button', { name: 'Studierende' }).click();
  await page.getByRole('button', { name: 'Dozierende' }).click();
  await page.getByRole('button', { name: 'Mitarbeitende' }).click();
});

test('student login-form contains all the elements', async ({ page }) => {
  await page.goto('http://localhost:3000/#');
  await page.getByText('Email').first().click();
  await page.getByPlaceholder('Studierenden-Email').click();
  await page.locator('span').filter({ hasText: 'Passwort' }).first().click();
  await page.getByRole('textbox', { name: 'Passwort' }).click();
  await page.getByRole('link', { name: 'Passwort vergessen?' }).click();
  await page.getByRole('button', { name: 'Einloggen' }).click();
  });
  
  test('teacher login-form contains all the elements', async ({ page }) => {
    await page.goto('http://localhost:3000/#');
    await page.getByRole('button', { name: 'Dozierende' }).click();
    await page.getByText('Email').nth(1).click();
    await page.getByPlaceholder('Dozierenden-Email').click();
    await page.locator('span').filter({ hasText: 'Passwort' }).nth(1).click();
    await page.getByRole('textbox', { name: 'Passwort' }).click();
    await page.getByRole('link', { name: 'Passwort vergessen?' }).click();
    await page.getByRole('button', { name: 'Einloggen' }).click();
  });

  test('admin login-form contains all the elements', async ({ page }) => {
    await page.goto('http://localhost:3000/#');
    await page.getByRole('button', { name: 'Mitarbeitende' }).click();
    await page.getByText('Email').nth(2).click();
    await page.getByPlaceholder('Mitarbeitenden-Email').click();
    await page.locator('span').filter({ hasText: 'Passwort' }).nth(2).click();
    await page.getByLabel('Passwort').click();
    await page.getByRole('link', { name: 'Passwort vergessen?' }).click();
    await page.getByRole('button', { name: 'Einloggen' }).click();
  });
  
 {/* STUDENT-PAGE TESTS */}

 test('student dashboard navbar contains title, logo and links to intro page', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboardStudent/');
  await page.getByRole('img').click();
  await page.getByRole('link', { name: 'Scida Medizinische Fakultät - Universität zu Köln' }).click();
});

 test('student dashboard contains the right text and links to the corresponding pages', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Studierende' }).click();
  await page.getByRole('button', { name: 'Einloggen' }).click();
  await page.getByRole('link', { name: 'Anwesenheit Hier findest du QR-Codes, mit denen deine Anwesenheit eingetragen werden kann.' }).click();
  await page.getByRole('link', { name: 'Ausdrucke Drucke dir die Anwesenheitslisten für deine Praktika aus.' }).click();
  await page.getByRole('link', { name: 'Meine Praktika Alle deine Blockpraktika auf einen Blick!' }).click();
});

test('student dashboard footer contains the right text and links to the corresponding pages', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboardStudent/');
  await page.getByRole('contentinfo').click();
  await page.getByText('© 2022 Scida. Alle Rechte vorbehalten.').click();
  await page.getByText('|').first().click();
  await page.getByRole('link', { name: 'Support' }).click();
  await page.getByText('|').nth(1).click();
  await page.getByRole('link', { name: 'Datenschutz' }).click();
  await page.getByText('|').nth(2).click();
  await page.getByRole('link', { name: 'Impressum' }).click();
});

