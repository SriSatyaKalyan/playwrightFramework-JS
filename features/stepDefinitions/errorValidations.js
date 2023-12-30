const {Given, When, Then} = require('@cucumber/cucumber');
const {test, expect} = require('@playwright/test');

  Given('login to eCommerceII application with {string} and {string}', {timeout: 100 * 1000}, async function (username, password) {
    const userName = this.page.locator('#username');
    const signIn = this.page.locator("#signInBtn");

    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    await expect(this.page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    await userName.fill(username);
    await this.page.locator("[type='password']").fill(password);
    await signIn.click();
  });

  Then('verify error message is displayed', async function () {
    const errorLocator = this.page.locator("[style*='block']");
    console.log("Error message: " + await errorLocator.textContent());
    expect(errorLocator).toContainText("Incorrect");
  });