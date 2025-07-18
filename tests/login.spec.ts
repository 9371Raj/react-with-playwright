import { test, expect } from '@playwright/test';

test('valid login navigates to dashboard', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await page.getByTestId('username').fill('admin');
  await page.getByTestId('password').fill('password');
  await page.getByTestId('login-button').click();

  await expect(page).toHaveURL('http://localhost:5173/dashboard');
  await expect(page.getByText('Dashboard')).toBeVisible();
});

test('invalid login shows error alert', async ({ page }) => {
  page.on('dialog', dialog => dialog.accept());

  await page.goto('http://localhost:5173/');

  await page.getByTestId('username').fill('wrong');
  await page.getByTestId('password').fill('wrongpass');
  await page.getByTestId('login-button').click();
});
