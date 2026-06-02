const { POManager } = require('../../pageobjects/POManager');
const playwright = require('@playwright/test');
const { Before, After, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');


Before(async function () {
    const browser = await playwright.chromium.launch({ headless: false });//am importat playwright keyword pentru a creat prin comanda asta, browser context
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);

});

AfterStep(async function ({ result }) {
    // This hook will be executed after all steps, and take a screenshot on step failure
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'screenshot1.png' });
    }
});

After(function () {
    console.log("I am the last to execute the scenario");
});