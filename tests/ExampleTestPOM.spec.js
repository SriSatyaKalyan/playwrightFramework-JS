const { test, expect } = require("@playwright/test");
const { pageObjectManager } = require("../pageObjects/pageObjectManager");
const dataSet = JSON.parse(JSON.stringify(require("../utils/testData.json")));

for (const data of dataSet) {
  test(`Playwright Test Example: ${data.productName}`, async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const pageObjManager = new pageObjectManager(page);

    const logPage = pageObjManager.getLoginPage();
    await logPage.landOnLoginPage();
    await logPage.validLogin(data.username, data.password);

    const dashpage = pageObjManager.getDashboardPage();
    await dashpage.searchProduct(data.productName);
    await dashpage.navigateToCart();

    await page.locator("div li").first().waitFor();

    //ensuring that the product is present in the cart
    expect(
      await page.locator("h3:has-text('" + data.productName + "')").isVisible()
    ).toBeTruthy();

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

    //Traveling to the Orders page
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

    //verifying the orderID on the details page is similar
    const orderIDDetails = await page.locator(".col-text").textContent();
    expect(orderID.includes(orderIDDetails)).toBeTruthy();

    // await page.pause();
  });
}
