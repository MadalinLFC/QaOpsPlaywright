import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  page: Page;
  cart: Locator;
  orders: Locator;
  checkout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cart = page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.getByText('Checkout', { exact: true });
  }

  async VerifyProductIsDisplayed(productName: string) {
    const product = this.page.locator('.cartSection h3, .cartSection b').filter({ hasText: productName }).first();

    await expect(product).toBeVisible({ timeout: 15000 });
    await expect(product).toContainText(productName, { timeout: 15000, ignoreCase: true });
  }

  async Checkout() {
    await expect(this.checkout).toBeEnabled();
    await this.checkout.click();
  }

  getProductLocator(productName: string): Locator {
    return this.page.locator('.cartSection h3, .cartSection b').filter({ hasText: productName });
  }
}