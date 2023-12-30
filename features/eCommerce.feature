Feature: ECommerce Validations

@UITest @Regression
Scenario: Placing the Order
    Given login to eCommerce application with "patyesh123@gmail.com" and "Password@123"
    When added "Zara Coat 3" to Cart
    Then verify "Zara Coat 3" is displayed in Cart
    When after entering valid details and placing order
    Then order is present in verify order history
    