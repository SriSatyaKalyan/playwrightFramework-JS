const {test, expect, request} = require('@playwright/test');
const loginPayload = {
    "userEmail": "patyesh123@gmail.com",
    "userPassword": "Password@123"
};
const orderPayload = {
    orders: [{country: "Cuba", 
    productOrderedId: "6581ca979fd99c85e8ee7faf"}]
};

let token;
let orderID;

test.beforeAll(async() => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post(
                        "https://rahulshettyacademy.com/api/ecom/auth/login", 
                        { data: loginPayload });
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJSON = JSON.parse(await loginResponse.text());
    token = loginResponseJSON.token;
    console.log("The token is: " + token);

    //Creating an Order 
    const orderResponse = await apiContext.post(
        "https://rahulshettyacademy.com/api/ecom/order/create-order",
        { 
            data: orderPayload,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }
    );
    const orderResponseJSON = await orderResponse.json();
    console.log(orderResponseJSON);
    orderID = orderResponseJSON.orders[0];
})

// test.beforeEach(() => {
    
// })

test('API Testing Example', async ({page}) => {
    
    await page.addInitScript(value => { window.localStorage.setItem('token', value); }, token);
    await page.goto("https://rahulshettyacademy.com/client/");    
    // const context = await browser.newContext();
    // const page = await context.newPage();
    
    const productName = "I Phone2";
    console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop");
    const products = page.locator(".card-body");

    //WE ARE HANDLING THE BELOW CODE USING TOKENS - first action in the beforeAll
    // await page.locator("[type='email']").fill("patyesh123@gmail.com");
    // await page.locator("[type='password']").fill("Password@123");
    // await page.locator("#login").click();

    // console.log(await page.locator('.card-body h5').first().textContent());
    // await page.waitForLoadState('networkidle'); //DISCOURAGED
    // await page.locator('.card-body h5').first().waitFor();

    //WE ARE HANDLING THE BELOW CODE USING TOKENS - Second action in beforeAll
    // const titles = await page.locator('.card-body b').allTextContents();
    // const count = await products.count();

    // console.log(titles + " || " + count);

    // for(let i = 0; i < count; i++){
    //     if(await products.nth(i).locator("b").textContent() === productName){
    //         await products.nth(i).locator("text= Add To Cart").click();
    //         break;
    //     }
    // }

    // //clicking on the cart
    // await page.locator("[routerlink *= 'cart']").click();
    // await page.locator("div li").first().waitFor();
    // //ensuring that the product is present in the cart
    // expect(await page.locator("h3:has-text('I Phone')").isVisible()).toBeTruthy();

    // await page.locator("text = Checkout").click();
    // await page.locator("[placeholder *= 'Country']").pressSequentially("ind", {delay: 100});

    // const dropdown = page.locator(".ta-results");
    // await dropdown.waitFor();

    // const optionsCount = await dropdown.locator("button").count();
    // for(let i = 0; i < optionsCount; i++){
    //     const text = await dropdown.locator("button").nth(i).textContent();
    //     if(text === " India"){
    //         await dropdown.locator("button").nth(i).click();
    //         break;
    //     }
    // }

    // expect(page.locator(".user__name [type='text']").first()).toHaveText("patyesh123@gmail.com");
    // await page.locator(".action__submit").click();

    // await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    // const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    // console.log("The orderID is: " + orderID);

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
    // await page.pause();
    expect(orderID.includes(orderIDDetails)).toBeTruthy();
});