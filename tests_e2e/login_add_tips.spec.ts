import { test, expect } from '@playwright/test';

import db from "../src/core/db.ts";
import {and, eq} from "drizzle-orm";
import {tip} from "../db/schemas/schema.ts";

test.afterEach(async () => {
    await db.delete(tip).where(and(eq(tip.userId, 4)));
});

test('test', async ({ page }) => {
    await page.goto('/login');

    // Login Page
    await expect(page.getByRole('heading', { name: 'ANMELDEN' })).toBeVisible();
    await page.getByPlaceholder('Deine E-mail-Adresse').click();
    await page.getByPlaceholder('Deine E-mail-Adresse').fill('lukas@podolski.pl');
    await page.getByPlaceholder('Passwort').click();
    await page.getByPlaceholder('Passwort').fill('test123');
    await page.getByRole('button', { name: 'Anmelden' }).click();

    // Dashboard Page
    await expect(page.getByRole('heading', { name: 'Spielplan' })).toBeVisible();

    // Check show countries
    await expect(page.getByText('France')).toBeVisible();
    await expect(page.getByText('Poland')).toBeVisible();

    // Add Tips
    await page.locator('input[name="tip1"]').first().fill('2');
    await page.locator('input[name="tip2"]').first().fill('1');
    await page.getByRole('button', { name: 'save' }).first().click();
    await expect(page.getByText('2', { exact: true })).toBeVisible();
    await expect(page.getByText('1', { exact: true })).toBeVisible();

    // Logout
    await page.getByRole('link', { name: 'Abmelden' }).click();
    await expect(page.getByRole('heading', { name: 'ANMELDEN' })).toBeVisible();
});
