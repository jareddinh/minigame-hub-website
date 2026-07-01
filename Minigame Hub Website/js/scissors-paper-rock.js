let playerChoice;
let computerChoice;

let options = ["scissors", "paper", "rock"];

let scissorsButton;
let paperButton;
let rockButton;

const beats = {
    scissors: "paper",
    paper: "rock",
    rock: "scissors"
}

let resultMessage;
let playerChoiceMessage;
let computerChoiceMessage;

let playerWins = 0;
let computerWins = 0;
let draws = 0;

window.onload = function() {
    // Options
    scissorsButton = document.getElementById("scissors");
    scissorsButton.addEventListener("click", chooseOption);
    paperButton = document.getElementById("paper");
    paperButton.addEventListener("click", chooseOption);
    rockButton = document.getElementById("rock");
    rockButton.addEventListener("click", chooseOption);

    // Results
    resultMessage = document.getElementById("result-message");
    playerChoiceMessage = document.getElementById("player-choice");
    computerChoiceMessage = document.getElementById("computer-choice");

    // Restart Game Button
    restartGameButton = document.getElementById("restart-game-button");
    restartGameButton.addEventListener("click", restartGame);

    // Reset Score Button
    resetScoreButton = document.getElementById("reset-score-button");
    resetScoreButton.addEventListener("click", resetScore);
}

function chooseOption() {
    // Player Option
    if (this.id == "scissors") {
        playerChoice = options[0];
    } else if (this.id == "paper") {
        playerChoice = options[1];
    } else {
        playerChoice = options[2];
    }

    // Computer Option
    computerOption();

    // Display Final Result
    displayChoices();

    // Check Winner and Update Stats
    checkWinner();
    updateStats();
}

function computerOption() {
    // Pick a random option
    randomNumber = Math.floor(Math.random()* 3);
    computerChoice = options[randomNumber];
}

function displayChoices() {
    // Display Player's Choice
    if (playerChoice == options[0]) { // Scissors
        playerChoiceMessage.innerHTML = `
        <p>✂️ Scissors</p>
        `;
    } else if (playerChoice == options[1]) { // Paper
        playerChoiceMessage.innerHTML = `
        <p>📃 Paper</p>
        `;
    } else { // Rock
        playerChoiceMessage.innerHTML = `
        <p>🪨 Rock</p>
        `;
    }

    // Display Computer's Choice
    if (computerChoice == options[0]) { // Scissors
        computerChoiceMessage.innerHTML = `
        <p>✂️ Scissors</p>
        `;
    } else if (computerChoice == options[1]) { // Paper
        computerChoiceMessage.innerHTML = `
        <p>📃 Paper</p>
        `;
    } else { // Rock
        computerChoiceMessage.innerHTML = `
        <p>🪨 Rock</p>
        `;
    }
}

function checkWinner() {
    if (playerChoice == computerChoice) { // Draw 
        draws++;
    } else { 
        if (beats[playerChoice] == computerChoice) { // Player Wins
            playerWins++;
        } else { // Computer Wins
            computerWins++;
        }
    }
}

function updateStats() {
    // Update Wins and Draws Count
    document.getElementById("player-wins-count").textContent = playerWins;

    document.getElementById("computer-wins-count").textContent = computerWins;

    document.getElementById("draws-count").textContent = draws;
}

function restartGame() {
    // Remove Display and Result
    resultMessage.textContent = "";
    playerChoiceMessage.innerHTML = "";
    computerChoiceMessage.innerHTML = "";
}

function resetScore() {
    // Reset Wins and Draws 
    playerWins = 0;
    computerWins = 0;
    draws = 0;

    updateStats();
}
