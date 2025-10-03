Feature: Manage Merchant

  Scenario: Get Merchants with default Parameter
    Given tokenFromRegister exists
    When I prepare a GET request to "/admin/merchants?limit=5&offset=0"
    When I set a bearer authentication header with tokenFromRegister value
    And send
    Then the response should be 200
    And the response body matches the merchant schema
    Then meta.total value is equal to 5

  Scenario: Get Certain Merchant
    Given tokenFromRegister exists
    When I prepare a GET request to "/admin/merchants?merchantId=id123abc"
    When I set a bearer authentication header with tokenFromRegister value
    And send
    Then the response should be 200
    And the response body matches the merchant schema
    Then data[].merchantId value is equal to "id123abc"

  Scenario: Get Merchant by Name
    Given tokenFromRegister exists
    When I prepare a GET request to "/admin/merchants?name=een&limit=5&offset=0"
    When I set a bearer authentication header with tokenFromRegister value
    And send
    Then the response should be 200
    And the response body matches the merchant schema
    Then data[].name value is equal to "kayleen"
    
  Scenario: Get Small Restaurant Merchants 
    Given tokenFromRegister exists
    When I prepare a GET request to "/admin/merchants?category=SmallRestaurant&limit=5&offset=0"
    When I set a bearer authentication header with tokenFromRegister value
    And send
    Then the response should be 200
    And the response body matches the merchant schema
    Then data[].merchantCategory value is equal to "SmallRestaurant"

  Scenario: Get Small Restaurant Merchants 
    Given tokenFromRegister exists
    When I prepare a GET request to "/admin/merchants?createdAt=asc&limit=5&offset=0"
    When I set a bearer authentication header with tokenFromRegister value
    And send
    Then the response should be 200
    And the response body matches the merchant schema
    Then data[].createdAt value is equal to "SmallRestaurant"

  Scenario: Get Small Restaurant Merchants 
    Given tokenFromRegister exists
    When I prepare a GET request to "/admin/merchants?createdAt=asc&limit=5&offset=0"
    When I set a bearer authentication header with tokenFromRegister value
    And send
    Then the response should be 200
    And the response body matches the merchant schema
    Then data[].createdAt value is equal to "SmallRestaurant"

#Non 200 Scenarios

  Scenario: Invalid Authentication Token 1
    When I prepare a GET request to "/admin/merchants?limit=5&offset=0"
    When I set a bearer authentication header with "notValidToken" value
    And send
    Then the response should be 401
