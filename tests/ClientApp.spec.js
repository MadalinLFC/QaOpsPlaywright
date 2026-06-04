 const {test, expect} = require('@playwright/test');




 test('Client App login', async ({page})=>
 {
    //js file- Login js, DashboardPage
     const email = "anshika@gmail.com";
     const productName = 'ZARA COAT 3';
     const products = page.locator(".card-body");
     await page.goto("https://rahulshettyacademy.com/client");
     await page.locator("#userEmail").fill(email);
     await page.locator("#userPassword").type("Iamking@000");
     await page.locator("[value='Login']").click();
     await page.waitForLoadState('networkidle');
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const normalizedProductName = productName.trim().toLowerCase();
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        const title = await products.nth(i).locator("b").textContent();
        if (title && title.trim().toLowerCase() === normalizedProductName) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
   
    await page.locator("[routerlink*='cart']").click();
    await page.waitForLoadState('networkidle');

    const cartProduct = page.locator("li", { hasText: productName }).first();
    await expect(cartProduct).toBeVisible({ timeout: 15000 });
    await expect(cartProduct).toContainText(productName, { timeout: 15000, ignoreCase: true });
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").type("ind",{delay:100});
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for(let i =0;i< optionsCount; ++i)
    {
        const text =  await dropdown.locator("button").nth(i).textContent();
        if(text === " India")
        {
           await dropdown.locator("button").nth(i).click();
           break;
        }
    }
   await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();
   
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderId);
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
 const rows = await page.locator("tbody tr");


 for(let i =0; i<await rows.count(); ++i)
 {
    const rowOrderId =await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId))
    {
        await rows.nth(i).locator("button").first().click();
        break;
    }
 }
 const orderIdDetails =await page.locator(".col-text").textContent();
 expect(orderId.includes(orderIdDetails)).toBeTruthy();
 });
 

 



 

