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
    // "WIN" - Player robot has defeated all enemy-robots
    //* Fight all enemy-robots
    //* Defeat each enemy-robot
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    // Call fight function with enemy-robot
    fight(pickedEnemyName);
}