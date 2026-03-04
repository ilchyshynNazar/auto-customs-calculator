import { test, expect } from '@playwright/test';

test('Car customs calculation - critical path', async ({ page }) => {
  // Go to the app
  await page.goto('/');

  // Verify we're on car tab by default (Легковий button is active)
  await expect(page.locator('button:has-text("Легковий")')).toHaveClass(/bg-green-600/);

  // Fill the car form
  await page.locator('label:has-text("Пальне") + select').selectOption('Бензин');
  await page.locator('label:has-text("Країна походження") + select').selectOption('Інші');
  await page.locator('label:has-text("Вік автомобіля") + select').selectOption('1 рік');
  await page.fill('input[placeholder="3500"]', '3500');
  await page.fill('input[placeholder="1500"]', '1500');

  // Submit the form
  await page.click('button:has-text("Розрахувати")');

  // Wait for calculation to complete
  await page.waitForSelector('text=Вартість авто із розмитненням');

  // Verify result panel shows calculated values
  await expect(page.locator('text=Ввізне мито')).toBeVisible();
  await expect(page.locator('text=Акцизне мито')).toBeVisible();
  await expect(page.locator('text=ПДВ')).toBeVisible();
  await expect(page.locator('text=Вартість авто із розмитненням')).toBeVisible();

  // Check that total cost is displayed (should be a number)
  const totalCost = page.locator('span').filter({ hasText: /€$/ }).last();
  await expect(totalCost).toBeVisible();
  const totalCostText = await totalCost.textContent();
  expect(parseFloat(totalCostText.replace(' €', ''))).toBeGreaterThan(0);
});