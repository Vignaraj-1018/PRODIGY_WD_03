const board = document.getElementById('board');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

const cells = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;

// Winning combinations
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Create board cells
function createBoard() {
  board.innerHTML = '';
  cells.forEach((_, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = index;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  });
}

// Handle cell clicks
function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (cells[index] || !gameActive) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add('taken');

  if (checkWinner(currentPlayer)) {
    message.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (cells.every(cell => cell)) {
    message.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.textContent = `Player ${currentPlayer}'s Turn`;
}

// Check for a winner
function checkWinner(player) {
  return winningCombinations.some(combination =>
    combination.every(index => cells[index] === player)
  );
}

// Reset the game
function resetGame() {
  cells.fill(null);
  currentPlayer = 'X';
  gameActive = true;
  message.textContent = "Player X's Turn";
  createBoard();
}

resetButton.addEventListener('click', resetGame);

// Initialize the game
createBoard();
