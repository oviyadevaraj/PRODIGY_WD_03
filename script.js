document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restart');
    const messageElement = document.getElementById('message');
    const twoPlayerButton = document.getElementById('two-player');
    const vsComputerButton = document.getElementById('vs-computer');
    let currentPlayer = 'X';
    let gameState = Array(9).fill(null);
    let gameActive = true;
    let isVsComputer = false;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = cell.getAttribute('data-index');

        if (gameState[cellIndex] !== null || !gameActive) {
            return;
        }

        gameState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin()) {
            messageElement.textContent = `Player ${currentPlayer} wins!!!`;
            highlightWinningCells();
            gameActive = false;
            return;
        }

        if (gameState.every(cell => cell !== null)) {
            messageElement.textContent = "It's a draw!!!";
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        messageElement.textContent = `Player ${currentPlayer}'s turn`;

        if (isVsComputer && currentPlayer === 'O') {
            setTimeout(makeComputerMove, 500);
        }
    }

    function makeComputerMove() {
        let emptyCells = [];
        gameState.forEach((cell, index) => {
            if (cell === null) {
                emptyCells.push(index);
            }
        });

        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        gameState[randomIndex] = currentPlayer;
        cells[randomIndex].textContent = currentPlayer;

        if (checkWin()) {
            messageElement.textContent = `Player ${currentPlayer} wins!!!`;
            highlightWinningCells();
            gameActive = false;
            return;
        }

        if (gameState.every(cell => cell !== null)) {
            messageElement.textContent = "It's a draw!!!";
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        messageElement.textContent = `Player ${currentPlayer}'s turn`;
    }

    function checkWin() {
        return winningConditions.some(condition => {
            return condition.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    }

    function highlightWinningCells() {
        winningConditions.forEach(condition => {
            if (condition.every(index => gameState[index] === currentPlayer)) {
                condition.forEach(index => cells[index].classList.add('winner'));
            }
        });
    }

    function restartGame() {
        currentPlayer = 'X';
        gameState = Array(9).fill(null);
        gameActive = true;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('winner');
        });
        messageElement.textContent = `Player ${currentPlayer}'s turn`;
    }

    function startTwoPlayerGame() {
        isVsComputer = false;
        restartGame();
    }

    function startVsComputerGame() {
        isVsComputer = true;
        restartGame();
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
    twoPlayerButton.addEventListener('click', startTwoPlayerGame);
    vsComputerButton.addEventListener('click', startVsComputerGame);
    messageElement.textContent = `Select a game mode to start playing`;
});
