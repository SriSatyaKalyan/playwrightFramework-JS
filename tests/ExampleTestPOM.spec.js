const {test, expect} = require('@playwright/test');
const {pageObjectManager} = require('../pageObjects/pageObjectManager');

test('Playwright Test Example', async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const username = "patyesh123@gmail.com";
    const password = "Password@123";
    const productName = "ZARA COAT 3";

    const pageObjManager= new pageObjectManager(page);
    const logPage = pageObjManager.getLoginPage();
    await logPage.landOnLoginPage();
    await logPage.validLogin(username, password);

    const dashpage = pageObjManager.getDashboardPage();
    await dashpage.searchProduct(productName);
    await dashpage.navigateToCart();

    await page.locator("div li").first().waitFor();
    
    //ensuring that the product is present in the cart
    expect(await page.locator("h3:has-text('ZARA COAT 3')").isVisible()).toBeTruthy();

    await page.locator("text = Checkout").click();
    await page.locator("[placeholder *= 'Country']").pressSequentially("ind", {delay: 100});

    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();

    const optionsCount = await dropdown.locator("button").count();
    for(let i = 0; i < optionsCount; i++){
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text === " India"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    expect(page.locator(".user__name [type='text']").first()).toHaveText("patyesh123@gmail.com");
    await page.locator(".action__submit").click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log("The orderID is: " + orderID);

    //Traveling to the Orders page
    await page.locator("button[routerlink *= 'myorders']").click();
    await page.locator("tbody").waitFor();

    const rows = await page.locator("tbody tr");

    for(let i = 0; i < await rows.count(); i++){
        const rowOrderID = await rows.nth(i).locator("th").textContent();
        if(orderID.includes(rowOrderID)){
            //clicking on the specific order
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    
    //verifying the orderID on the details page is similar
    const orderIDDetails = await page.locator(".col-text").textContent();
    expect(orderID.includes(orderIDDetails)).toBeTruthy();

    // await page.pause();
});