const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.cart = page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.getByText('Checkout', { exact: true });
  }

  async VerifyProductIsDisplayed(productName) {
    const product = this.getProductLocator(productName).first();

    await expect(product).toBeVisible({ timeout: 15000 });
    await expect(product).toContainText(productName, { timeout: 15000, ignoreCase: true });
  }

  async Checkout() {
    await expect(this.checkout).toBeEnabled();
    await this.checkout.click();
  }

  getProductLocator(productName) {
    return this.page.locator('.cartSection h3, .cartSection b').filter({ hasText: productName });
  }
}

module.exports = { CartPage };