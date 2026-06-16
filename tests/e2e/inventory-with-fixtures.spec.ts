// On importe depuis nos fixtures, pas depuis @playwright/test
import { test, expect } from '../../fixtures/index';

test.describe('Inventory — avec Fixtures', () => {

  test('la page catalogue est accessible après connexion',
    async ({ inventoryPage }) => {
    // Pas de beforeEach, pas de login — la fixture s'en charge
    const count = await inventoryPage.getProductCount();
    expect(count).toBe(6);
    await expect(inventoryPage.pageTitle).toContainText('Products');
  });

  test('ajout de deux produits au panier',
    async ({ inventoryPage }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    const cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe('2');
  });

  test('login avec compte bloqué retourne une erreur',
    async ({ loginPage }) => {
    await loginPage.loginAndExpectError(
      'locked_out_user',
      'secret_sauce'
    );
  });

});