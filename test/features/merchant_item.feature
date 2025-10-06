Feature: Manage Merchant Items

  Scenario: Add Merchant geolocation
    Given tokenFromRegister exists
    When I prepare a POST request to "/admin/merchants/addedMerchantId/items" 
    When I set a bearer authentication header with tokenFromRegister value
    And I use postItemSchema payload
    And send
    Then the response should be 201
    And the response body matches the merchantId schema
    And save the "body.merchantId" value as addedMerchantLocation

  Scenario: Get Merchant Items
    Given tokenFromRegister exists
    When I prepare a GET request to "/admin/merchants/id123abc/items"
    When I set a bearer authentication header with tokenFromRegister value
    And send
    Then the response should be 200
    And the response body matches the item schema
    Then meta.total value is equal to 5

#Non 200
  
  Scenario: Invalid Authentication Token 2
    When I prepare a GET request to "/admin/merchants/id123abc/items"
    When I set a bearer authentication header with "notValidToken" value
    And send
    Then the response should be 401

  Scenario: Merchant Not Found
    Given tokenFromRegister exists
    When I prepare a GET request to "/admin/merchants/notFoundMerchant123/items"
    When I set a bearer authentication header with tokenFromRegister value
    And send
    Then the response should be 404