class DashboardPage
{
constructor(page, options = {})
{
    this.page = page;
    this.products = page.locator(options.productsSelector || ".card-body");
    this.productsText = page.locator(options.productTitleSelector || ".card-body b");
    this.cart =  page.locator(options.cartSelector || "[routerlink*='cart']");
    this.orders = page.locator(options.ordersSelector || "button[routerlink*='myorders']");
    this.loadedUrl = options.loadedUrl || null;
    this.cartToast = page.locator("#toast-container");
    this.loadingOverlay = page.locator(".ngx-spinner-overlay");

}

async searchProductAddCart(productName)
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

async waitForLoaded()
{
    if (this.loadedUrl) {
        await this.page.waitForURL(this.loadedUrl);
    }
}

async hasProduct(productName)
{
    return await this.productsText.filter({ hasText: productName }).count() > 0;
}

}
module.exports = {DashboardPage};