Feature: Error Validations

    @Regression
    Scenario Outline: Placing the Order
        Given login to eCommerceII application with "<username>" and "<password>"
        Then verify error message is displayed

        Examples:
            | username    | password  |
            | rahulbetty  | clearning |
            | rahulshetty | learning  |