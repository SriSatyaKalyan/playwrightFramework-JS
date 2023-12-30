Feature: Error Validations

@Regression
Scenario: Placing the Order
    Given login to eCommerceII application with "rahulshetty" and "learning"
    Then verify error message is displayed
    