const {expect} = require('@playwright/test');

class loginPage {

  constructor(page) {
    this.page = page;
    this.signInbutton = page.locator("#login");
    this.userName = page.locator("[type='email']");
    this.password = page.locator("[type='password']");
  }

  async validLogin(username, password){
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.signInbutton.click();
    await this.page.waitForLoadState('networkidle'); 
    await expect(this.page).toHaveTitle("Let's Shop");
  }

  async landOnLoginPage(){
    await this.page.goto("https://rahulshettyacademy.com/client");
  }
}

module.exports = {loginPage};
