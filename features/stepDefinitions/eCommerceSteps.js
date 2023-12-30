const {Given, When, Then} = require('@cucumber/cucumber');
const { pageObjectManager } = require("../../pageObjects/pageObjectManager");
const { expect } = require('@playwright/test');

Given('login to eCommerce application with {string} and {string}', {timeout: 100 * 1000}, async function(username, password){ 
    const logPage = this.pageObjManager.getLoginPage();
    await logPage.landOnLoginPage();
    await logPage.validLogin(username, password);
})

When('added {string} to Cart', async function(item){
    const dashpage = this.pageObjManager.getDashboardPage();
    await dashpage.searchProduct(item);
    await dashpage.navigateToCart();
})

Then('verify {string} is displayed in Cart', async function (item) {
    await this.page.locator("div li").first().waitFor();

    //ensuring that the product is present in the cart
    expect(await this.page.locator("h3:has-text('" + item + "')").isVisible())
    .toBeTruthy();
})

When('after entering valid details and placing order', async function(){
    await page.locator("text = Checkout").click();
    await page
      .locator("[placeholder *= 'Country']")
      .pressSequentially("ind", { delay: 100 });

    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();

    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; i++) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
        await dropdown.locator("button").nth(i).click();
        break;
      }
    }

    expect(page.locator(".user__name [type='text']").first()).toHaveText(
      "patyesh123@gmail.com"
    );
    await page.locator(".action__submit").click();

    await expect(page.locator(".hero-primary")).toHaveText(
      " Thankyou for the order. "
    );

    const orderID = await page
      .locator(".em-spacer-1 .ng-star-inserted")
      .first()
      .textContent();
    console.log("The orderID is: " + orderID);
})

Then('order is present in verify order history', async function(){
    await page.locator("button[routerlink *= 'myorders']").click();
    await page.locator("tbody").waitFor();

    const rows = await page.locator("tbody tr");

    for (let i = 0; i < (await rows.count()); i++) {
      const rowOrderID = await rows.nth(i).locator("th").textContent();
      if (orderID.includes(rowOrderID)) {
        //clicking on the specific order
        await rows.nth(i).locator("button").first().click();
        break;
      }
    }

    const orderIDDetails = await page.locator(".col-text").textContent();
    expect(orderID.includes(orderIDDetails)).toBeTruthy();
})