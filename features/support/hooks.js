const { Before, After, BeforeStep, AfterStep } = require("@cucumber/cucumber");

const { pageObjectManager } = require("../../pageObjects/pageObjectManager");
const playwright = require('@playwright/test');

Before(async function() {
    const browser = await playwright.chromium.launch({
        headless: true
    });

    const context = await browser.newContext();
    this.page = await context.newPage();

    //world constructor
    this.pageObjManager = new pageObjectManager(this.page);
})

BeforeStep(function() {

});

AfterStep(async function({ result }) {
    // if(result.status === Status.FAILED){
    //     await this.page.screenshot( {path: 'failureScreenshot.png'} );
    // }
})

After(async function() {
    console.log("This is the After hook");
})