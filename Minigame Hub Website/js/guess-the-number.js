let minNum = 1;
let maxNum = 100;
let currentMin = 1;
let currentMax = 100;
let hidden;

let guesses = 0;
let leastGuesses = Infinity;
let guessCounter;

let message;
let resultMin;
let resultMax;

let gameOver = false;


document.addEventListener("DOMContentLoaded", function() {
    // Create hidden number
    hidden = generateRandomNumber();

    document.getElementById("guess-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevents page refresh when submitting
        guessNumber();
    });

    guessCounter = document.getElementById("guesses-count");

    // Result Message
    message = document.getElementById("result-message");
    resultMin = document.getElementById("current-min");
    resultMax = document.getElementById("current-max");

    // Restart Game Button
    const restartGameButton = document.getElementById("restart-game-button");
    restartGameButton.addEventListener("click", restartGame);

    // Reset Score Button
    const resetScoreButton = document.getElementById("reset-score-button");
    resetScoreButton.addEventListener("click", resetScore);
});

function generateRandomNumber() {
    // Generate a random number between 1-100 inclusive
    return Math.floor(Math.random() * (maxNum)) + minNum;
}

function guessNumber() {
    const guess = document.getElementById("guess").value;

    // Increase guess count
    if (!gameOver) {
        guesses++;
        document.getElementById("guesses-count").textContent = guesses;
    }

    // User guesses hidden number correctly
    if (guess == hidden) {
        message.textContent = "Correct!";

        // Disable guesses
        gameOver = true;
        document.querySelector('[type="submit"]').disabled = true;

        // Update Least Guesses 
        leastGuesses = Math.min(guesses, leastGuesses);
        document.getElementById("least-guesses-count").textContent = leastGuesses;

    // Guess is less than hidden number
    } else if (guess < hidden) {
        message.textContent = "Too low!";

        currentMin = Math.max(currentMin, guess);
        resultMin.textContent = currentMin + 1;

    // Guess is higher than hidden number
    } else {
        message.textContent = "Too high!";

        currentMax = Math.min(currentMax, guess);
        resultMax.textContent = currentMax - 1;

    }
}

function restartGame() {
    gameOver = false;

    // Reset stats and remove message
    currentMin = 1;
    currentMax = 100;
    guesses = 0;

    resultMin.textContent = currentMin;
    resultMax.textContent = currentMax;
    document.getElementById("guesses-count").textContent = guesses;
    message.textContent = "";

    // Re-enable guessing and generate new number
    document.querySelector('[type="submit"]').disabled = false;
    hidden = generateRandomNumber();
}

function resetScore() {
    // Reset guesses and least guesses 
    guesses = 0;
    leastGuesses = Infinity;

    document.getElementById("guesses-count").textContent = guesses;
    document.getElementById("least-guesses-count").textContent = 0;
}
