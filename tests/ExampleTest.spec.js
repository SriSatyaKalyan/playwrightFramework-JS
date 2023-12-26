const {test, expect} = require('@playwright/test');

test('Playwright Test Example', async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    // page.route('**/*.css', route => route.abort());
    page.route('**/*.{jpg, png, jpeg}', route => route.abort());
    
    const productName = "I Phone";
    const products = page.locator(".card-body");

    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop");

    await page.locator("[type='email']").fill("patyesh123@gmail.com");
    await page.locator("[type='password']").fill("Password@123");
    await page.locator("#login").click();

    // console.log(await page.locator('.card-body h5').first().textContent());
    await page.waitForLoadState('networkidle'); //DISCOURAGED
    // await page.locator('.card-body h5').first().waitFor();
    const titles = await page.locator('.card-body b').allTextContents();
    const count = await products.count();

    console.log(titles + " || " + count);

    
    for(let i = 0; i < count; i++){
        if(await products.nth(i).locator("b").textContent() === productName){
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    //clicking on the cart
    await page.locator("[routerlink *= 'cart']").click();
    await page.locator("div li").first().waitFor();
    //ensuring that the product is present in the cart
    expect(await page.locator("h3:has-text('I Phone')").isVisible()).toBeTruthy();

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