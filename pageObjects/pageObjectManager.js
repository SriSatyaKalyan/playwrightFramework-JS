const {loginPage} = require('../pageObjects/loginPage');
const {dashboardPage} = require('../pageObjects/dashboardPage');

class pageObjectManager{

    constructor(page){
        this.page = page;
        this.logPage = new loginPage(page);
        this.dashpage = new dashboardPage(page);
    }

    getLoginPage(){
        return this.logPage;
    }

    getDashboardPage(){
        return this.dashpage;
    }
}

module.exports = {pageObjectManager};