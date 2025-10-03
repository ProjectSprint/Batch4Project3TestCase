Feature: Admin Authentication
  As a system administrator
  I want to register and log in as an admin
  So that I can manage the platform securely

  Scenario: Successful admin registration
    When I prepare a POST request to "/admin/register"
    And I use registerEmail payload
    And send
    Then the response should be 201
    And the response body matches the auth schema
    And save the "body.username" value as emailFromRegister
    And save the "body.password" value as passwordFromRegister
    And save the "body.token" value as tokenFromRegister

  Scenario: Registration fails with invalid payload
    When I prepare a POST request to "/admin/register"
    And I inject registerEmail violations
    And send violations
    Then the violation responses should be 400

  Scenario: Registration fails with username conflict
    Given tokenFromRegister exists
    When I prepare a POST request to "/admin/register"
    And I use registerEmail payload
    And send
    Then the response should be 409

  Scenario: Successful admin login
    Given tokenFromRegister exists
    When I prepare a POST request to "/admin/login"
    And I use loginEmail payload
    And send
    Then the response should be 200
    And the response body matches the auth schema

  Scenario: Login fails with wrong password
    Given tokenFromRegister exists
    When I prepare a POST request to "/admin/login"
    And I use loginEmailInvalidPass payload
    And send
    Then the response should be 400

  Scenario: Login fails with invalid payload
    When I prepare a POST request to "/admin/login"
    And I inject loginEmail violations
    And send violations
    Then the violation responses should be 400
