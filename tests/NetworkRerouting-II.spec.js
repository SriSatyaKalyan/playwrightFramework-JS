const { test, expect } = require("@playwright/test");

test("Security Test Request Interception", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("[type='email']").fill("patyesh123@gmail.com");
  await page.locator("[type='password']").fill("Password@123");
  await page.locator("#login").click();

  await page.waitForLoadState("networkidle");
  await page.locator(".card-body h5").first().waitFor();

  await page.locator("button[routerlink *= 'myorders']").click();

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=658b34709fd99c85e8f4a51d",
      })
  );

  await page.locator("button:has-text('View')").first().click();
  //   await page.pause();
  await expect(page.locator("p").last()).toHaveText(
    "You are not authorize to view this order"
  );
});
