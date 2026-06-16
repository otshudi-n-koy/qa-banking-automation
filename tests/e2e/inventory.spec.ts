import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { users } from '../../data/users';

test.describe('Inventory — Catalogue Produits', () => {

  test.beforeEach(async ({ page }) => {
    // Authentification avant chaque test
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginAndExpectSuccess(
      users.validUser.username,
      users.validUser.password
    );
  });

  test('la page catalogue affiche les produits', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const count = await inventoryPage.getProductCount();
    expect(count).toBeGreaterThan(0);
    await expect(inventoryPage.pageTitle).toContainText('Products');
  });

  test('le catalogue affiche 6 produits', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const count = await inventoryPage.getProductCount();
    expect(count).toBe(6);
  });

  test('tri des produits de A à Z', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy('az');
    const firstProduct = await page
      .locator('.inventory_item_name')
      .first()
      .textContent();
    expect(firstProduct).toBe('Sauce Labs Backpack');
  });

  test('tri des produits de Z à A', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy('za');
    const firstProduct = await page
      .locator('.inventory_item_name')
      .first()
      .textContent();
    expect(firstProduct).toBe('Test.allTheThings() T-Shirt (Red)');
  });

  test('ajout d\'un produit au panier', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    const cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe('1');
  });

});