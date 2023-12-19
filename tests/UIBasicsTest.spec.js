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
    const signIn = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
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
    
    //dropdown
    await dropdown.selectOption("consult");

    //radio button
    await page.locator(".radiotextsty").last().click();

    //popup
    await page.locator("#okayBtn").click();

    //assertion to check if the radio button is checked
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    console.log("Is dropdown checked?: " + await page.locator(".radiotextsty").last().isChecked()); //returns boolean value

    //checkbox
    const conditionsCheckBox = page.locator("#terms");
    await conditionsCheckBox.click();
    await expect(conditionsCheckBox).toBeChecked();;
    await conditionsCheckBox.uncheck();
    expect(await conditionsCheckBox.isChecked()).toBeFalsy();

    // await page.pause();

    //handling the blinking text
    const documentLink = page.locator("[href='https://rahulshettyacademy.com/documents-request']");
    await expect(documentLink).toHaveAttribute("class", "blinkingText");

    await signIn.click();

    //Printing first and last cellphone values
    console.log(await cardTitles.nth(0).textContent());
    console.log(await cardTitles.last().textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});

test.only('Child Windows Playwright Test', async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    const documentLink = page.locator("[href='https://rahulshettyacademy.com/documents-request']");
    await expect(documentLink).toHaveAttribute("class", "blinkingText");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ]);
    const text = await newPage.locator(".red").textContent();
    
    console.log("The red text is: " + text);
    const arrText = text.split("@");
    const domain = arrText[1].split(" ")[0];
    console.log("The domain name is: " + domain.split(".")[0]);

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator('#username').fill(domain.split(".")[0]);
    await page.pause();
    console.log("The text content is: " + await page.locator('#username').textContent());
})