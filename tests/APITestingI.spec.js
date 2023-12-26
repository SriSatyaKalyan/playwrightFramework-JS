const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');

const loginPayload = {
    "userEmail": "patyesh123@gmail.com",
    "userPassword": "Password@123"
};
const orderPayload = {
    orders: [{
        country: "Cuba", 
        productOrderedId: "6581ca979fd99c85e8ee7faf"
    }]
};

let token;
let response;

test.beforeAll(async() => {
    const apiContext = await request.newContext();
    const APIUtilsObj = new APIUtils(apiContext, loginPayload);
    response = await APIUtilsObj.createOrder(orderPayload);
})

// test.beforeEach(() => {})

test('API Testing Example', async ({page}) => {
    await page.addInitScript(value => { window.localStorage.setItem('token', value); }, response.token);
    await page.goto("https://rahulshettyacademy.com/client/");    
    // const context = await browser.newContext();
    // const page = await context.newPage();
    
    const productName = "I Phone2";
    console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop");
    const products = page.locator(".card-body");

    //Traveling to the Orders page
    await page.locator("button[routerlink *= 'myorders']").click();
    await page.locator("tbody").waitFor();

    const rows = await page.locator("tbody tr");

    for(let i = 0; i < await rows.count(); i++){
        const rowOrderID = await rows.nth(i).locator("th").textContent();
        if(response.orderID.includes(rowOrderID)){
            //clicking on the specific order
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    
    //verifying the orderID on the details page is similar
    const orderIDDetails = await page.locator(".col-text").textContent();
    // await page.pause();
    expect(response.orderID.includes(orderIDDetails)).toBeTruthy();
});