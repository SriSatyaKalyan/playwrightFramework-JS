const {test, expect} = require('@playwright/test');

test.only('Playwright Test Example', async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop");

    await page.locator("[type='email']").fill("patyesh123@gmail.com");
    await page.locator("[type='password']").fill("Password@123");
    await page.locator("#login").click();

    // console.log(await page.locator('.card-body h5').first().textContent());
    // await page.waitForLoadState('networkidle');
    await page.locator('.card-body h5').first().waitFor();
    console.log(await page.locator('.card-body h5').allTextContents());
});