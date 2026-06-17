import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../data/users';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.loginAndExpectSuccess(
    users.validUser.username,
    users.validUser.password
  );

  // Sauvegarde l'état de session — cookies + localStorage
  await page.context().storageState({ path: authFile });
});