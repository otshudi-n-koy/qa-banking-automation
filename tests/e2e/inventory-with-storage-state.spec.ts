import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../pages/InventoryPage';

// Pas de login ici — la session vient de storageState
test.describe('Inventory — avec storageState (session réutilisée)', () => {

  test('accès direct au catalogue sans repasser par le login', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    // On est déjà authentifié grâce au storageState
    await expect(inventoryPage.pageTitle).toContainText('Products');
    const count = await inventoryPage.getProductCount();
    expect(count).toBe(6);
  });

  test('le panier fonctionne directement', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    const cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe('1');
  });

});