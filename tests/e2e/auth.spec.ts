import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { users } from '../../data/users';

test.describe('Authentication', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('login avec des identifiants valides', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginAndExpectSuccess(
      users.validUser.username,
      users.validUser.password
    );
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toContainText('Products');
  });

  test('login avec un compte bloqué', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginAndExpectError(
      users.lockedUser.username,
      users.lockedUser.password
    );
    await expect(page.locator('[data-test="error"]'))
      .toContainText('locked out');
  });

  test('login avec des identifiants invalides', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginAndExpectError(
      users.invalidUser.username,
      users.invalidUser.password
    );
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  test('login sans identifiants', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('', '');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

});