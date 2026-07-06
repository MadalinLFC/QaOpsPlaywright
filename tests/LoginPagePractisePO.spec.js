const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage');
const { DashboardPage } = require('../pageobjects/DashboardPage');

test('LoginPage Practise login shows iphone X product', async ({ page }) => {
    const loginPage = new LoginPage(page, {
        loginUrl: 'https://rahulshettyacademy.com/loginpagePractise/',
        userNameSelector: '#username',
        passwordSelector: '#password',
        signInSelector: '#signInBtn',
        termsSelector: '#terms',
        waitForNetworkIdle: false,
    });
    const shopPage = new DashboardPage(page, {
        productTitleSelector: '.card-title a',
        loadedUrl: '**/angularpractice/shop',
    });

    await loginPage.goTo();
    await loginPage.loginWithTerms(
        'rahulshettyacademy',
        process.env.RSA_PRACTICE_PASSWORD || 'Learning@830$3mK2'
    );

    await shopPage.waitForLoaded();

    await expect(page).toHaveURL(/angularpractice\/shop/);
    await expect(await shopPage.hasProduct('iphone X')).toBeTruthy();
});