import { test, expect } from '@playwright/test';

test('test signup and login', async ({ page }) => {
    const email = 'test_' + Date.now() + '@test.com';

    await page.goto('/signup');
    await page.getByPlaceholder('Deine E-mail-Adresse').click();
    await page.getByPlaceholder('Deine E-mail-Adresse').fill(email);
    await page.getByPlaceholder('Deine E-mail-Adresse').press('Tab');
    await page.getByPlaceholder('Vergib ein Passwort').fill('test123');
    await page.getByPlaceholder('Vergib ein Passwort').press('Tab');
    await page.getByPlaceholder('Gib dein neues Passwort noch').fill('test123');
    await page.getByPlaceholder('Gib dein neues Passwort noch').press('Tab');
    await page.getByPlaceholder('Deine Name').fill('Test Name');
    await page.getByPlaceholder('Deine Name').press('Tab');
    await page.getByPlaceholder('Dein Nachname').fill('Test Nachname');
    await page.getByPlaceholder('Dein Nachname').press('Tab');
    await page.getByPlaceholder('Der Benutzername wird in der').fill('test_test');
    await page.getByPlaceholder('Der Benutzername wird in der').press('Tab');
    await page.getByLabel('Standort').selectOption('Langenfeld');
    await page.getByLabel('Gewinner', { exact: true }).selectOption('DEU');
    await page.getByLabel('Geheimen Gewinner').selectOption('POL');
    await page.getByRole('button', { name: 'Registrieren' }).click();
    await page.getByPlaceholder('Deine E-mail-Adresse').click();

    await expect(page.getByText('Du bist erfolgreich')).toBeVisible();
    await page.getByPlaceholder('Deine E-mail-Adresse').click();
    await page.getByPlaceholder('Deine E-mail-Adresse').fill(email);

    await page.getByPlaceholder('Passwort').click();
    await page.getByPlaceholder('Passwort').fill('test123');

    await page.getByRole('button', { name: 'Anmelden' }).click();
    await expect(page.getByRole('heading', { name: 'Spielplan' })).toBeVisible();
});
