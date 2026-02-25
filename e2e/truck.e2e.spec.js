import { test, expect } from '@playwright/test';

test('Truck customs calculation - critical path', async ({ page }) => {
  // Go to the app
  await page.goto('/');

  // Click on Truck tab
  await page.click('button:has-text("Вантажний")');

  // Fill the truck form
  await page.locator('label:has-text("Тип палива") + select').selectOption('Дизель');
  await page.locator('label:has-text("Країна походження") + select').selectOption('Інші');
  await page.locator('label:has-text("Вік вантажівки") + select').selectOption('До 5 років');
  await page.locator('label:has-text("Валова маса") + select').selectOption('До 5 тонн');
  await page.fill('input[placeholder="15000"]', '15000');

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