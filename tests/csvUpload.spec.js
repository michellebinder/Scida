import { test, expect } from '@playwright/test';
const assert = require("assert");
const mysql = require("mysql2");

test('csvUpload', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByPlaceholder('mmuster1 / mmuster1@test.de ').click();
  await page.getByPlaceholder('mmuster1 / mmuster1@test.de ').type('dekanat@test.de');
  await page.getByPlaceholder('Passwort').click();
  await page.getByPlaceholder('Passwort').type('123test');
  await page.getByRole('button', { name: 'Einloggen' }).click();
  await page.waitForNavigation();
  let currentUrl = page.url();
  assert.strictEqual(currentUrl, 'http://localhost:3000/dashboard/', 'Login went wrong');
  await page.getByRole('link', { name: 'CSV hochladen Laden Sie hier CSV-Dateien der Blockpraktika hoch. Sie werden automatisch in das System eingepflegt.' }).click();
  await page.waitForNavigation();
  currentUrl = page.url();
  assert.strictEqual(currentUrl, 'http://localhost:3000/csvAdmin/', 'Login went wrong');
  await page.getByPlaceholder('z.B. SoSe2022 oder WiSe2022/2023').click();
  await page.getByPlaceholder('z.B. SoSe2022 oder WiSe2022/2023').fill('SoSe2025');
  await page.locator('#fileInput').setInputFiles('./public/klips_Matrikelnummer.csv');
  await page.getByRole('cell', { name: 'lfd.Nr.' }).click();
  await page.getByRole('row', { name: 'lfd.Nr. Gruppe Platz Matrikelnummer Abschlussziel SPO-Version Studien-ID Studium Fachsemester Anmeldedatum Kennzahl' }).getByRole('cell', { name: 'Gruppe' }).click();
  await page.getByRole('cell', { name: 'Platz' }).click();
  await page.getByRole('cell', { name: 'Matrikelnummer' }).click();
  await page.getByRole('cell', { name: 'Abschlussziel' }).click();
  await page.getByRole('cell', { name: 'SPO-Version' }).click();
  await page.getByRole('cell', { name: 'Studien-ID' }).click();
  await page.getByRole('row', { name: 'lfd.Nr. Gruppe Platz Matrikelnummer Abschlussziel SPO-Version Studien-ID Studium Fachsemester Anmeldedatum Kennzahl' }).getByRole('cell', { name: 'Studium' }).click();
  await page.getByRole('cell', { name: 'Fachsemester' }).click();
  await page.getByRole('cell', { name: 'Anmeldedatum' }).click();
  await page.getByRole('cell', { name: 'Kennzahl' }).click();
  await page.getByRole('button', { name: 'hochladen' }).click();
  await page.getByRole('heading', { name: 'Die CSV-Datei wurde erfolgreich hochgeladen.' }).click();

  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@UniKoeln123",
    database: "test_db",
  });

  try {
  await connection.execute("DELETE from CSV;");
  } catch (error) {
    console.error("Error insert in CSV ", error);
  } finally {
    connection.end();
  }
});