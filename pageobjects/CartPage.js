const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.cartProducts = page.locator('div li').first();
    this.productsText = page.locator('.card-body b');
    this.cart = page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.getByText('Checkout', { exact: true });
  }

  async VerifyProductIsDisplayed(productName) {
    const product = this.getProductLocator(productName);

    await this.cartProducts.waitFor({ state: 'visible' });
    await expect(product).toBeVisible({ timeout: 10000 });
    await expect(product).toContainText(productName, { timeout: 10000 });
  }

  async Checkout() {
    await expect(this.checkout).toBeEnabled();
    await this.checkout.click();
  }

  getProductLocator(productName) {
    return this.page.locator('h3', { hasText: productName });
  }
}

module.exports = { CartPage };
module.exports = {CartPage};