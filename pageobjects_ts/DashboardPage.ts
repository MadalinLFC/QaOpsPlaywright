import { expect, type Locator, type Page } from '@playwright/test';
export class DashboardPage
{   page: Page;
    products: Locator;
    productsText: Locator;
    cart: Locator;
    orders: Locator;
    cartToast: Locator;
    loadingOverlay: Locator;
constructor(page:any)
{
    this.page = page;
    this.products = page.locator(".card-body");
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.cartToast = page.locator("#toast-container");
    this.loadingOverlay = page.locator(".ngx-spinner-overlay");

}

async searchProductAddCart(productName: string)
{
    const normalizedProductName = productName.trim().toLowerCase();
    const count = await this.products.count();

    for (let i = 0; i < count; ++i) {
        const title = await this.products.nth(i).locator("b").textContent();

        if (title && title.trim().toLowerCase() === normalizedProductName) {
            await this.products.nth(i).locator("text= Add To Cart").click();
            await this.cartToast.waitFor({ state: 'visible' });
            await this.loadingOverlay.waitFor({ state: 'hidden' });
            break;
        }
    }
}

async navigateToOrders()
{
    await this.orders.click();
}


async navigateToCart()
{
    await this.cart.click();
}

}