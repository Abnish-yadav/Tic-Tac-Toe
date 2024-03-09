const board = document.getElementById('board');
const status = document.getElementById('status');
const newGameBtn = document.getElementById('new-game-btn');

let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick(index) {
    if (!gameActive || boardState[index] !== '') return;
    boardState[index] = currentPlayer;
    renderBoard();
    if (checkWin()) {
        status.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }
    if (checkDraw()) {
        status.textContent = "It's a draw!";
        gameActive = false;
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return boardState[index] === currentPlayer;
        });
    });
}

function checkDraw() {
    return boardState.every(cell => cell !== '');
}

function renderBoard() {
    board.innerHTML = '';
    boardState.forEach((cell, index) => {
        const button = document.createElement('button');
        button.textContent = cell;
        button.addEventListener('click', () => handleCellClick(index));
        board.appendChild(button);
    });
}

function startNewGame() {
    currentPlayer = 'X';
    gameActive = true;
    boardState = ['', '', '', '', '', '', '', '', ''];
    status.textContent = `Player ${currentPlayer}'s turn`;
    renderBoard();
}

newGameBtn.addEventListener('click', startNewGame);

startNewGame();
