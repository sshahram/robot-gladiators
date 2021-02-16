// Function to generate random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max -min + 1)) + min;

    return value;
};

var playerInfo = {
    name: window.prompt("What is your robot's name?"),
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

var fight = function(enemy) {
    // Repeat and execute as long as the enemy-robot is alive
    while(enemy.health > 0 && playerInfo.health > 0) {

        //Check to see if the player wants to fight or skip
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        // If player picks "skip" confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            //if yes (true), leave fight
            if (confirmSkip) {
                window. alert(playerInfo.name + " has decided to skip the fight. Goodbye!");
                //subtract money from playerInfo.money for skipping
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerInfo.money", playerInfo.money);
                //shop();
                break;
            }
        }

        //if player chooses to fight, then fight
        else if (promptFight === "fight" || promptFight === "FIGHT") {

            //Subtract the valueof 'playerInfo.attack from the value of 'enemy.health and use that result to update the value in 'enemy.health' variable.
            // Generate random damage value based on player's attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

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

            //Subtract the value of 'enemy.attack' from the value of 'playerInfo.health and use that result to update the value in the 'playerInfo.health variable.
            var damage = randomNumber(enemy.attack -3, enemy.attack);

            playerInfo.health = Math.max(0, playerInfo.health - damage);

            //Log a resulting message to the console so we know that it worked.
            console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

            //Check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            } 
            
        } else {
            window.alert("You need to choose a valid option. Try again!");
        }
    }

};

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

            // If player is still alive and we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1 ) {
                // Ask if player wnats to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // If yes, take them to the store function
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
    // If player is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert("Greate job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }

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


var shop = function() {
    // Ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
        );
    
    // Use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL": // New case
        case "refill" :
            playerInfo.refillHealth();
            break;

        case "UPGRADE": // New case
        case "upgrade":
            playerInfo.upgradeAttack();
            break;

        case "LEAVE": // New case
        case "leave":
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

// start the game when the page loads
startGame();

