Feature: User Registration
  As a new user
  I want to register with email or phone
  So that I can log into the system

  Scenario: Successful registration with email
    When I prepare a POST request to "/api/register"
    And I use registerEmail payload
    And send
    Then the response should be 201
    And the response body matches the user schema

  Scenario: Registration fails with invalid payload
    When I prepare a POST request to "/api/register"
    And I inject registerEmail violations
    And send
    Then the response should be 400

