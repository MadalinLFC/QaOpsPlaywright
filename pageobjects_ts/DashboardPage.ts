import { expect, type Locator, type Page } from '@playwright/test';
export class DashboardPage
{   page: Page;
    products: Locator;
    productsText: Locator;
    cart: Locator;
    orders: Locator;
constructor(page:any)
{
    this.page = page;
    this.products = page.locator(".card-body");
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");

}

async searchProductAddCart(productName: string)
{
    const normalizedProductName = productName.trim().toLowerCase();
    const titles = await this.productsText.allTextContents();
    console.log(titles);
    const count = await this.products.count();
    for (let i = 0; i < count; ++i) {
        const title = await this.products.nth(i).locator("b").textContent();
        if (title && title.trim().toLowerCase() === normalizedProductName) {
            await this.products.nth(i).locator("text= Add To Cart").click();
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