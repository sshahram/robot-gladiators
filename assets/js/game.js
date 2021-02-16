/* GAME FUNCTIONS */

//Function to start a new game
var startGame = function() {
    //debugger;
    //reset player stats
    playerInfo.reset();
    
    // fight each enemy-robot by looping over them and fighting them one at a time
    for(var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            // Let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            // Pick new enemy to fight based on the index of the enemy array
            var pickedEnemyObj = enemyInfo[i];

            //reset enemy.health before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);

            //Use debugger to pause script from running and check what's going on at that moment in the code
            //debugger;

            // Pass the pickedEnemyObj variable's value into the fight function, where it will assume the value of the enemy parameter
            fight(pickedEnemyObj);
            // if player is still alive after the fight and we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
            // ask if player wants to use the store before next round
            var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

            // if yes, take them to the store() function
            if (storeConfirm) {
                shop();
        }
      }

    }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }

    // After the loop ends, player is either our of health or enemies to fight, so run the endGame function
    endGame();
};

//function to end the entire game
var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");

    // Check localStorage for high score, if it's not there, use 0
    var highscore = localStorage.getItem("highscore");
    if (highscore === null) {
        highscore = 0;
    }

    // If player have more money than the high score, player has new high score!
    if (playerInfo.money > highscore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    }

    else {
        alert(playerInfo.name + " did not beat the high score of " + highscore + ". Maybe next time!");
    }

    // If player is still alive, player wins!
    // if (playerInfo.health > 0) {
    //     window.alert("Greate job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    // }
    // else {
    //     window.alert("You've lost your robot in battle.");
    // }

    // Ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // Reset the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }

};

var fightOrSkip = function() {
    // Ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    // Conditional Recursive  Function Call
    if (!promptFight) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    promptFight = promptFight.toLowerCase();

    // If player picks "skip" confirm and then stop the loop
    if (promptFight === "skip") {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
    
            //if yes (true), leave fight
            if (confirmSkip) {
                window. alert(playerInfo.name + " has decided to skip the fight. Goodbye!");
                //subtract money from playerInfo.money for skipping
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                //console.log("playerInfo.money", playerInfo.money);
                //shop();

                // Return true if player wants to leave
                return true;
            }
    }
    return false;
};
 


var fight = function(enemy) {
    // Keep track of who goes first
    var isPlayerTurn = true;

    // Randomely change turn order
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    // Repeat and execute as long as the enemy-robot is alive
    while(enemy.health > 0 && playerInfo.health > 0) {
        if(isPlayerTurn) {
            // Ask player if they'd like to fight or skip using fightOrSkip function
            if (fightOrSkip()) {
                //if true, leave fight by breaking loop
                break;
            }

            //Subtract the valueof 'playerInfo.attack from the value of 'enemy.health and use that result to update the value in 'enemy.health' variable.
            // Generate random damage value based on player's attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            // Remove enemy's health by subtracting the amount we set in the damage variable
            enemy.health = Math.max(0, enemy.health - damage);

            //Log a resulting message to the console so we know that it worked.
            console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");

            //Check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");

                // Award player money for winning
                playerInfo.money = playerInfo.money + 20;

                // Leave the while loop since enemy is dead
            break;
            }else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }

        // Player gets attacked first
        } else {

            //Subtract the value of 'enemy.attack' from the value of 'playerInfo.health and use that result to update the value in the 'playerInfo.health variable.
            var damage = randomNumber(enemy.attack -3, enemy.attack);

            // remove player's health by subtracting the amount we set in the damage variable
            playerInfo.health = Math.max(0, playerInfo.health - damage);

            //Log a resulting message to the console so we know that it worked.
            console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

            //Check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                // Leave while loop if player is dead
                break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            } 
         }   
         // Switch turn order for next round
         isPlayerTurn = !isPlayerTurn;   
    }
};


var shop = function() {
    // Ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for 'REFILL', 2 for 'UPGRADE', or 3 for 'LEAVE'."
        );

    // check if prompt answer was left blank, player hit "cancel", or provided a number instead
    if (shopOptionPrompt === null || shopOptionPrompt === "" || isNaN(shopOptionPrompt)) {
        window.alert("You need to provide a valid answer! Please try again.");
        return shop();
    }

    shopOptionPrompt = parseInt(shopOptionPrompt);
    
    // Use switch to carry out action
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;

        case 2:
            playerInfo.upgradeAttack();
            break;

        case 3:
            window.alert("Leaving the store");
            // Do nothing so function will end
            break;

        default:
            window.alert("You did not pick a valid option. Try again.");

            // Call shop() again to force player to pick a valid option
            shop();
            break;

    }
};

// Function to generate random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max -min + 1)) + min;

    return value;
};

// Function to set name
var getPlayerName = function() {
    var name = "";

    while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
}

    console.log("Your robot's name is " + name);
    return name;
}

/* END GAME FUNCTIONS */

/* GAME INFORMATION / VARIABLES */

// player information
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    }, //coma!
    refillHealth: function() {
        if(this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }, //coma!
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

// enemy information
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

/* END GAME INFORMATION / VARIABLES */

// start the game when the page loads
startGame();

