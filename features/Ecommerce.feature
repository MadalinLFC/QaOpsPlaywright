Feature: Ecommerce validations
  @Regression
  Scenario: Placing the order
    Given a login to ecommers application with "madalin.petrasciuc@yahoo.com" and "Madalin@123"
    When Add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 3" is displyed in the cart page
    When Enter valid details and Place the Order
    Then Verify order is present

  @Madalin
  Scenario Outline: Placing the order with different credentials
    # Outline - indica faptul ca testul este parametrizat si o sa ia datele din Examples de mai jos, iar datele pe care vrem sa le luam din table sunt puse intre <>
    Given a login to ecommers2 application with "<email>" and "<password>"
    Then Verify Error message is displayed

    Examples:
      | email                        | password    |
      | madalin.petrasciuc@yahoo.com | Madalin@123 |
      | mama@yahoo.com               | mama@123    |