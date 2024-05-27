document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".button-option");
  const gameStatus = document.getElementById("message");
  const restartButton = document.getElementById("restart");
  const gameModeSelect = document.getElementById("game-mode-select");
  const popup = document.querySelector(".popup");
  const newGameButton = document.getElementById("new-game");
  
  let currentPlayer = "X";
  let gameActive = true;
  let gameMode = "two-players";
  let board = Array(9).fill(null);

  function initializeGame() {
      buttons.forEach((button, index) => {
          button.textContent = "";
          button.addEventListener("click", () => handleButtonClick(index));
      });
      restartButton.addEventListener("click", resetGame);
      newGameButton.addEventListener("click", resetGame);
      gameModeSelect.addEventListener("change", handleGameModeChange);
      updateGameStatus();
  }

  function handleButtonClick(index) {
      if (board[index] !== null || !gameActive) return;

      board[index] = currentPlayer;
      buttons[index].textContent = currentPlayer;
      checkForWinner();

      if (gameMode === "ai" && gameActive) {
          makeAIMove();
      } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
          updateGameStatus();
      }
  }

  function checkForWinner() {
      const winningCombinations = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
      ];

      let roundWon = false;
      for (let i = 0; i < winningCombinations.length; i++) {
          const [a, b, c] = winningCombinations[i];
          if (board[a] && board[a] === board[b] && board[a] === board[c]) {
              roundWon = true;
              break;
          }
      }

      if (roundWon) {
          gameStatus.textContent = `${currentPlayer} wins!`;
          gameActive = false;
          popup.classList.add("show");
          return;
      }

      if (!board.includes(null)) {
          gameStatus.textContent = "It's a tie!";
          gameActive = false;
          popup.classList.add("show");
          return;
      }
  }

  function makeAIMove() {
      const emptyIndices = board.map((value, index) => value === null ? index : null).filter(index => index !== null);
      const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      board[randomIndex] = "O";
      buttons[randomIndex].textContent = "O";
      checkForWinner();
      if (gameActive) {
          currentPlayer = "X";
          updateGameStatus();
      }
  }

  function handleGameModeChange(event) {
      gameMode = event.target.value;
      resetGame();
  }

  function updateGameStatus() {
      if (gameActive) {
          gameStatus.textContent = `${currentPlayer}'s turn`;
      }
  }

  function resetGame() {
      currentPlayer = "X";
      gameActive = true;
      board.fill(null);
      buttons.forEach(button => button.textContent = "");
      popup.classList.remove("show");
      updateGameStatus();
  }

  initializeGame();
});
