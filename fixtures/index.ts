import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../data/users';

// On définit les types de nos fixtures personnalisées
type BankingFixtures = {
  authenticatedPage: ReturnType<typeof base.extend>;
  inventoryPage: InventoryPage;
  loginPage: LoginPage;
};

// On étend le test de base avec nos fixtures
export const test = base.extend<BankingFixtures>({

  // Fixture : page déjà authentifiée
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginAndExpectSuccess(
      users.validUser.username,
      users.validUser.password
    );
    // La page est prête — on la passe au test
    await use(page as any);
  },

  // Fixture : InventoryPage déjà chargée
  inventoryPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginAndExpectSuccess(
      users.validUser.username,
      users.validUser.password
    );
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },

  // Fixture : LoginPage
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

});

export { expect } from '@playwright/test';