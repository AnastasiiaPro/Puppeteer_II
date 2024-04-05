Feature: Testing the application
    Scenario: Booking a free seat for the first session tomorrow
        Given user is on "/client/index.php" page
        When user click "body > nav > a:nth-child(2)"
        When user click "body > main > section:nth-child(1) > div:nth-child(2) > ul > li:nth-child(1)"
        When user click "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(1) > span:nth-child(1)"
        When user click "body > main > section > button"
        Then user sees "Вы выбрали билеты:"

    Scenario: Booking a VIP seat for tomorrow's first session
        Given user is on "/client/index.php" page
        When user click "body > nav > a:nth-child(2)"
        When user click "body > main > section:nth-child(1) > div:nth-child(2) > ul > li:nth-child(1)"
        When user click "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(4) > span.buying-scheme__chair.buying-scheme__chair_vip"
        When user click "body > main > section > button"
        Then user sees "Вы выбрали билеты:"  

    Scenario: Cannot buy a ticket for the last session
        Given user is on "/client/index.php" page
        When user click "body > main > section:nth-child(1) > div:nth-child(2) > ul > li > a"                
        Then user can't click       