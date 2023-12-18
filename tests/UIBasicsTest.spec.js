const {test} = require('@playwright/test');

test('Browser Context Playwright Test', async({browser}) => {
    //playwright code here

    //instantiate chrome browser
    //By mentioning await, we are ensuring synchronous operation
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");    
});

test.only('Page Playwright Test', async({page}) => {
    //playwright code here

    //if we don't have any properties, we can skip the first two steps where we are setting context and page
    await page.goto("https://google.com");    
});