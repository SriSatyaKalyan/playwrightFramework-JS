const {test, expect} = require('@playwright/test');

test.only('Angular Practice Test Example', async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male");

    await page.getByPlaceholder("Password").fill("ahfbdhjf@hkebf");

    await page.getByRole("button", {name: 'Submit'}).click();

    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    await page.getByRole("link", {name: 'Shop'}).click();

    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
})