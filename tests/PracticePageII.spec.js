const {test, expect} = require('@playwright/test');

test('@Web Practice Page II', async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    //navigation steps
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();

    //handling hiddent items
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    await page.locator("#confirmbtn").click();
    // await page.pause();

    //handling popups
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();

    //hovering
    await page.locator("#mousehover").hover();

    // await page.pause();
    //handling frames
    

})