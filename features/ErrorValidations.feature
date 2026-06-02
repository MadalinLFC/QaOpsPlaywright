Feature: Ecommerce validations
  @Validation
  # Scenario: Placing the order
  #   Given a login to ecommers2 application with "madalin.petrasciuc@yahoo.com" and "Madalin@123"
  #   Then Verify Error message is displayed

# Parameterization, parallel, html, rerun failed tests
@Madalin
Scenario Outline: Placing the order with different credentials 
# Outline - indica faptul ca testul este parametrizat si o sa ia datele din Examples de mai jos, iar datele pe care vrem sa le luam din table sunt puse intre <>
    Given a login to ecommers2 application with "<email>" and "<password>"
    Then Verify Error message is displayed

  Examples:
    | email                          | password     |
    | madalin.petrasciuc@yahoo.com   | Madalin@123  |
    | mama@yahoo.com                 | mama@123     |