const {test, expect} = require('@playwright/test');

test('Page Playwright Test', async({page}) => {
    //playwright code here

    //if we don't have any properties, we can skip the first two steps where we are setting context and page
    await page.goto("https://google.com");
    const title = await page.title();
    console.log(title);

    //Assertions
    await expect(page).toHaveTitle("Google");

    //css, xpath locators
    await page.locator('#username').fill("rahulshetty");
    await page.locator("[type='password']").fill("learning");
    await page.locator("#signInBtn").click();

    //checking the error message to be displayed
    console.log("Error message: " + await page.locator("[style*='block']").textContent());
});

test('Browser Context Playwright Test', async({browser}) => {
    //playwright code here

    //instantiate chrome browser
    //By mentioning await, we are ensuring synchronous operation
    const context = await browser.newContext();
    const page = await context.newPage();

    //locator variables
    const userName = page.locator('#username');
    // const passWord;
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    //Assertions
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    //css, xpath locators
    await userName.fill("rahulshetty");
    await page.locator("[type='password']").fill("learning");
    await signIn.click();

    //checking the error message to be displayed
    const errorLocator = page.locator("[style*='block']");
    console.log("Error message: " + await errorLocator.textContent());
    expect(errorLocator).toContainText("Incorrect");

    //By entering "", we are clearing the pre-existing content
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();

    //Printing first and last cellphone values
    console.log(await cardTitles.nth(0).textContent());
    console.log(await cardTitles.last().textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});









