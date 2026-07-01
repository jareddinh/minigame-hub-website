const playerO = "O";
const playerX = "X";
let currentPlayer = playerO;

let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameCells;

let winningPositions = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal 1
    [2, 4, 6]  // Diagonal 2
];

let gameOver = false;
let gameOverMessage;

let playerOWins = 0;
let playerOWinsCounter;
let playerXWins = 0;
let playerXWinsCounter;
let draws = 0;
let drawsCounter;

document.addEventListener("DOMContentLoaded", function()  {
    // Add click event to each cell
    gameCells = document.getElementsByClassName("cell");
    for (let cell of gameCells) {
        cell.addEventListener("click", placeCell);
    }

    // Game Over and Stats 
    gameOverMessage = document.getElementById("game-over-message");
    playerOWinsCounter = document.getElementById("o-count");
    playerXWinsCounter = document.getElementById("x-count");
    drawsCounter = document.getElementById("draws-count");

    // Restart Game Button
    const restartGameButton = document.getElementById("restart-game-button");
    restartGameButton.addEventListener("click", restartGame);

    // Reset Score Button
    const resetScoreButton = document.getElementById("reset-score-button");
    resetScoreButton.addEventListener("click", resetScore)
});

function placeCell() {
    // Do nothing if game is over
    if (gameOver) {
        return;
    } 

    // Grab index of cell that was clicked
    const index = Number(this.id);
    if (gameBoard[index] != "") { // Ignore if cell has a symbol
        return;
    }

    const currentTurn = document.getElementById("current-player");
    gameBoard[index] = currentPlayer;
    this.innerText = currentPlayer;

    // Add symbol to clicked cell and swap player turn
    if (currentPlayer == playerO) { // Player O
        this.classList.add("o-symbol");
        currentTurn.classList.remove("o-symbol");

        currentPlayer = playerX;
        currentTurn.classList.add("x-symbol");
    } else { // Player X
        this.classList.add("x-symbol");
        currentTurn.classList.remove("x-symbol");

        currentPlayer = playerO;
        currentTurn.classList.add("o-symbol");
    }

    currentTurn.textContent = currentPlayer;

    // Check for Winner/Draw
    checkWinner();
    checkDraw();
}

function checkWinner() {
    // Check if there is a winning position
    for (let position of winningPositions) {
        let a = gameBoard[position[0]];
        let b = gameBoard[position[1]];
        let c = gameBoard[position[2]];

        if (a == b && b == c && a != "") {
            for (let i = 0; i < gameBoard.length; i++) {
                // Add winning cell class to cells in winning position
                if (position.includes(i)) {
                    if (a == playerO) { // Player O wins
                        gameCells[i].classList.add("winning-cell-o");
                    } else { // Player X Wins
                        gameCells[i].classList.add("winning-cell-x");
                    }
                }
            }

            if (a == "O") { // Player O Wins
                playerOWins++;
                playerOWinsCounter.textContent = playerOWins;
                gameOverMessage.innerHTML = '<span class="o-symbol">O</span> Wins!';

            } else { // Player X Wins
                playerXWins++;
                playerXWinsCounter.textContent = playerXWins;
                gameOverMessage.innerHTML = '<span class="x-symbol">X</span> Wins!';
            }

            gameOver = true;
            return;
        }
    }
}

function checkDraw() {
    if (gameOver) {
        return;
    }

    // Don't check if there is an empty cell
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] == "") {
            return;
        }
    }

    // No winning position and all cells contain a symbol
    gameOver = true;
    draws++;
    drawsCounter.textContent = draws;
    gameOverMessage.textContent = "Draw!";
}

function restartGame() {
    // Reset every cell
    for (let cell of gameCells) {
        cell.innerText = "";
        cell.classList.remove("o-symbol", "x-symbol", "winning-cell-o", "winning-cell-x");
    }


    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;
    gameOverMessage.textContent = "";
}

function resetScore() {
    // Reset wins and draws
    playerOWins = 0;
    playerXWins = 0;
    draws = 0;

    playerOWinsCounter.textContent = playerOWins;
    playerXWinsCounter.textContent = playerXWins;
    drawsCounter.textContent = draws;
}

