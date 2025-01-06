const cells = document.querySelectorAll('[data-cell]');
const winnerMessage = document.getElementById('winnerMessage');
const winnerText = document.getElementById('winnerText');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
const board = Array(9).fill(null);

// Winning combinations
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Handle cell click
function handleClick(e) {
  const cell = e.target;
  const index = Array.from(cells).indexOf(cell);

  if (board[index] || checkWinner()) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  if (checkWinner()) {
    endGame(false);
  } else if (board.every(cell => cell)) {
    endGame(true);
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Check for a winner
function checkWinner() {
  return winningCombinations.some(combination => {
    return combination.every(index => board[index] === currentPlayer);
  });
}

// End the game
function endGame(draw) {
  if (draw) {
    winnerText.textContent = "It's a draw!";
  } else {
    winnerText.textContent = `${currentPlayer} wins!`;
  }
  winnerMessage.classList.add('show');
}

// Restart the game
function restartGame() {
  board.fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
  currentPlayer = 'X';
  winnerMessage.classList.remove('show');
}

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
