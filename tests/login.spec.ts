// install: npm install otpauth
import { test, expect } from '@playwright/test';
import * as OTPAuth from 'otpauth';

test('login with msal popup and automated mfa', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // 1. Wait for popup and trigger it
  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('button', { name: /Login with Microsoft/i }).click();
  const popup = await popupPromise;
  
  // 2. Standard Microsoft Login
  await popup.getByPlaceholder('Email, phone, or Skype').fill(process.env.VITE_EMAIL!);
  await popup.getByRole('button', { name: 'Next' }).click();
  await popup.getByText('Use your password').click();
  await popup.fill('input[type="password"]', process.env.VITE_PASS!);
  await popup.getByRole('button', { name: 'Next' }).click();
  await popup.getByTitle('Stay signed in?')
  await popup.getByRole('button', { name: 'Yes' }).click();

  // 3. Handle "Sign in another way" if Push Notification still appears
  const otherWay = popup.getByRole('link', { name: /other ways/i });
  if (await otherWay.isVisible()) {
    await otherWay.click();
    await popup.getByRole('button', { name: /verification code/i }).click();
  }

  // 4. Generate and fill TOTP code
  const totp = new OTPAuth.TOTP({
    issuer: 'Microsoft',
    label: process.env.VITE_EMAIL,
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: process.env.VITE_SECRET_KEY!, // Key from step 1
  });

  const code = totp.generate();
  await popup.locator('input[name="otc"]').fill(code);
  await popup.getByRole('button', { name: 'Verify' }).click();

  // 5. MSAL automatically closes the popup; wait for the main page to reflect login
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
 // await expect(page.getByText(`Welcome back, ${process.env.VITE_EMAIL!}`)).toBeVisible();
});
