class APIUtils{

    constructor(apiContext, loginPayload){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken(){
        const loginResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login", 
            { 
                data: this.loginPayload 
            }
        );
        // expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJSON = JSON.parse(await loginResponse.text());
        const token = loginResponseJSON.token;
        console.log("The token is: " + token);
        return token;
    }

    async createOrder(orderPayload){
        let response = {};
        response.token = await this.getToken();

        const orderResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/order/create-order",
            { 
                data: orderPayload,
                headers: {
                    'Authorization': response.token,
                    'Content-Type': 'application/json'
                }
            }
        );
        const orderResponseJSON = await orderResponse.json();
        console.log(orderResponseJSON);
        const orderID = orderResponseJSON.orders[0];
        response.orderID = orderID;
        return response;
    }
}

module.exports = {APIUtils};