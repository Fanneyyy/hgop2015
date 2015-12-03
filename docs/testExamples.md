Test Examples
=========

The aim is to collect examples for Unit tests using an event based approach. 
      
#### Example 1:
Feature: Create new game

* Scenario: User creates a new game  
    Given nothing  
    When I create a game  
    Then a game is created

#### Example 2:
Feature: Join a game

* Scenario: User joins a game that another user has created  
    Given that a game exists  
    When I join a game  
    Then I should be included in that game  

* Scenario: User joins a game that doesn't exist  
    Given that the game doesn't exists  
    When I join the game  
    Then I should not be included in the game  
      And I should receive feedback that the game doesn't exist  
    
* Scenario: User joins a game that already has the maximum number of players  
    Given that the game exists and the game already has two players  
    When I join game  
    Then I should not be included in the game  
      And I should receive feedback that the game is full
      
#### Example 3:
Feature: Make a play

* Scenario: Make a legal play  
    Given that a game exists  
    When I choose an empty box that is not out of bounds  
    Then that box should belong to me  
      And that box should be marked as not empty  
  
* Scenario: Make an illegal play on a non-empty box  
    Given that a game exists that has non-empty boxes  
    When I choose a non-empty box that is not out of bounds  
    Then that box should not belong to me  
      And I should receive feedback that the box is unavailable  
    
* Scenario: Make an illegal play on a box that is out of bounds  
    Given that a game exists  
    When I choose a box that is out of bounds  
    Then that box should not belong to me  
      And I should receive feedback that the play is not legal

#### Example 4:
Feature: A game is won

* Scenario: The game is won by getting a complete row  
    Given that a game exists that needs one move so a player will get a complete row  
    When I choose a play that gives me a complete row  
    Then I will win the game  

* Scenario: The game is won by getting a complete column   
    Given that a game exists that needs one move so a player will get a complete column  
    When I choose a play that gives me a complete column  
    Then I will win the game  

* Scenario: The game is won by getting a complete diagonal row    
    Given that a game exists that needs one move so a player will get a complete diagonal row  
    When I choose a play that gives me a complete diagonal row  
    Then I will win the game  

#### Example 5:
Feature: A game is a draw

* Scenario: A game has no available moves left and no winner
    Given that a game exists that has one move left that cannot result in a win
    When I choose the last remaining box
    Then the game ends in a draw
