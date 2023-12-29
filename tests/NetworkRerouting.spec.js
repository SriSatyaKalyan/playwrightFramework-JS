const {test, request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');

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
const fakePayloadOrders  = {
    data: [],
    message: "No Orders"
}

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

    //routing it to a certain page
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", 
    async route => {
        //intercepting the response - faking the response
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayloadOrders);
        route.fulfill({
            response, 
            body,
        });
    });

    //Traveling to the Orders page
    await page.locator("button[routerlink *= 'myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    // await page.pause();
});