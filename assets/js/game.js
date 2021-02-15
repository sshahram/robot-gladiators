var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roberto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;


var fight = function(enemyName) {
    // Repeat and execute as long as the enemy-robot is alive
    while(enemyHealth > 0 && playerHealth > 0) {

        //Check to see if the player wants to fight or skip
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        // If player picks "skip" confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            //if yes (true), leave fight
            if (confirmSkip) {
                window. alert(playerName + " has decided to skip the fight. Goodbye!");
                //subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
        }

        //if player chooses to fight, then fight
        else if (promptFight === "fight" || promptFight === "FIGHT") {

            //Subtract the valueof 'playerAttack from the value of 'enemyHealth and use that result to update the value in 'enemyHealth' variable.
            enemyHealth = enemyHealth - playerAttack;

            //Log a resulting message to the console so we know that it worked.
            console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

            //Check enemy's health
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");

                // Award player money for winning
                playerMoney = playerMoney + 20;

                // Leave the while loop since enemy is dead
                break;
            }else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.");
            }

            //Subtract the value of 'enemyAttack' from the value of 'playerHealth and use that result to update the value in the 'playerHealth variable.
            playerHealth = playerHealth - enemyAttack;

            //Log a resulting message to the console so we know that it worked.
            console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");

            //Check player's health
            if (playerHealth <= 0) {
                window.alert(playerName + " has died!");
                break;
            } else {
                window.alert(playerName + " still has " + playerHealth + " health left.");
            } 
            
        } else {
            window.alert("You need to choose a valid option. Try again!");
        }
    }

};

// Game States

// "LOSE" - Player robot's health is zero or less


for(var i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0) {
        // Let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
        window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

        // Pick new enemy to fight based on the index of th enemyNames array
        var pickedEnemyName = enemyNames[i];

        //reset enemyHealth before starting new fight
        enemyHealth = 50;

        //Use debugger to pause script from running and check what's going on at that moment in the code
        //debugger;

        // Pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
        fight(pickedEnemyName);
    }
    else {
        window.alert("You have lost your robot in battle! Game Over!");
        break;
    }
}