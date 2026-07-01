const symbols = ["🍎", "🍌", "🍇", "🍒", "🍉", "🍋"];

// Duplicate symbols for pairs
let cardsArray = [...symbols, ...symbols];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;
let attempts = 0;
let leastAttempts = Infinity; 

let gameOverMessage;

document.addEventListener("DOMContentLoaded", function() {
    // Create game
    shuffleCards();
    createBoard();

    gameOverMessage = document.getElementById("game-over-message");

    // Restart Game Button
    const restartGameButton = document.getElementById("restart-game-button");
    restartGameButton.addEventListener("click", restartGame);

    // Reset Score Button
    const resetScoreButton = document.getElementById("reset-score-button");
    resetScoreButton.addEventListener("click", resetScore);
});

function shuffleCards() {
    // Shuffle cards
    cardsArray.sort(() => Math.random() - 0.5);
}

function createBoard() {
    // Create an element for each card
    for (let symbol of cardsArray) {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="front"></div>
            <div class="back">${symbol}</div>
        `;
        card.dataset.symbol = symbol;

        card.addEventListener("click", flipCard);

        board.appendChild(card);
    }
}

function flipCard() {
    // Do nothing during unflip transition
    if (lockBoard) {
        return;
    }

    // Do nothing when clicking a card already selected
    if (this === firstCard) {
        return;
    }

    // Flip transition
    this.classList.add("flip");

    // Selecting first card
    if (!firstCard) {
        firstCard = this;
        return;
    }

    // Selecting second card
    secondCard = this;

    checkMatch();
}

function checkMatch() {
    // Check if two cards match symbols
    const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

    // Increase attempts counter
    attempts++;
    document.getElementById("attempts-count").textContent = attempts;

    // Cards are matching
    if (isMatch) {
        disableCards();
        matches++;

    // Cards are not matching
    } else {
        unflipCards();  
    }

    // Check if game has ended
    checkGameOver();
}   

function disableCards() {
    // Disable matched cards
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    clearSelectedCards();
}

function unflipCards() {
    // Prevent selecting cards during unflipping
    lockBoard = true;

    // 1 Second Delay for Unflipping Transition
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        clearSelectedCards();   
    }, 1000);
}

function clearSelectedCards() {
    // Clear card selection for next attempt
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function checkGameOver() {
    // Check for unmatched cards
    let cards = document.getElementsByClassName("card");
    for (let card of cards) {
        if (!card.classList.contains("matched")) {
            return; // Do nothing if there is an unmatched pair
        }
    }
    
    // Display Win Message and Update 
    gameOverMessage.textContent = "You won in " + attempts + " attempts!";

    // Update Least Attempts 
    leastAttempts = Math.min(attempts, leastAttempts);
    document.getElementById("least-attempts-count").textContent = leastAttempts;
}

function restartGame() {
    // Remove card elements
    board.innerHTML = "";

    // Reset stats and remove game over message
    matches = 0;
    attempts = 0;
    document.getElementById("attempts-count").textContent = attempts;
    gameOverMessage.textContent = "";

    // Reshuffle and create new board
    shuffleCards();
    createBoard();
    clearSelectedCards();
}

function resetScore() {
    // Reset Score to 0 and Update Stats
    attempts = 0;
    leastAttempts = Infinity;

    document.getElementById("attempts-count").textContent = attempts;
    document.getElementById("least-attempts-count").textContent = 0;
}
