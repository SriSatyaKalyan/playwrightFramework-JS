const {test, expect} = require('@playwright/test');

test('Validations and More', async({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.locator('#displayed-text').screenshot({path: 'screenshotPartial.png'});
    
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    // await page.screenshot({path: 'screenshot.png'});

    await expect(page.locator('#displayed-text')).toBeHidden();
})

test.only('Visual Testing', async({page}) => {
    await page.goto("https://google.com");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
})