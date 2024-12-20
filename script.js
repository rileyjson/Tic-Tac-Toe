const boxes = document.querySelectorAll("td");
const rows = document.querySelectorAll("tr");

const Modal = (function () {
  const modal = document.querySelector(".add-book-modal");

  addEventListener("DOMContentLoaded", () => {
    modal.showModal();
  });

  const openModal = () => {
    modal.showModal();
  };

  const closeModal = () => {
    modal.close();
  };

  return { openModal, closeModal };
})();

const Players = function () {
  const xInput = document.querySelector(".x-input").value;
  const oInput = document.querySelector(".o-input").value;

  let playerX = { name: "", symbol: "X" };
  let playerO = { name: "", symbol: "O" };

  const addPlayerX = () => {
    playerX.name = xInput;

    return playerX;
  };

  const addPlayerO = () => {
    playerO.name = oInput;

    return playerO;
  };

  return { addPlayerX, addPlayerO };
};

const PlayGame = (function () {
  const winnerModal = document.querySelector(".winner-modal");
  const winnerText = document.querySelector(".winner-text");
  const playerNames = document.querySelector(".vs-text");
  const startButton = document.querySelector(".modal-close");
  const { openModal, closeModal } = Modal;

  let p1;
  let p2;
  let turn = 0;

  startButton.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal();
    p1 = Players().addPlayerX();
    p2 = Players().addPlayerO();
    playerNames.textContent = p1.name + " VS " + p2.name;
  });

  boxes.forEach((element) => {
    element.addEventListener("click", () => {
      if (element.textContent == "") {
        //add symbol if there isn't already one there
        writeChar(element);
      }
    });
  });

  const clearTextBoxes = () => {
    boxes.forEach((element) => {
      element.textContent = "";
    });
  };

  const writeChar = (element) => {
    //places symbol in boxes
    if (turn % 2 == 0) {
      // if even #, it's an X. Used for alternating player
      element.textContent = "X";
      element.setAttribute("data-symbolX", "X");
      turn++;
    } else {
      element.textContent = "O";
      element.setAttribute("data-symbolO", "O");
      turn++;
    }
    checkWinner();
  };

  const checkWinner = () => {
    const restartButton = document.querySelector(".restart-game");
    const resetButton = document.querySelector(".reset-game");
    const gameBoard = [
      [getCellValue(0, 0), getCellValue(0, 1), getCellValue(0, 2)],
      [getCellValue(1, 0), getCellValue(1, 1), getCellValue(1, 2)],
      [getCellValue(2, 0), getCellValue(2, 1), getCellValue(2, 2)],
    ];

    console.log(gameBoard);

    for (i = 0; i < rows.length; i++) {
      const checkWinnerXRow = gameBoard[i].every((spot) => spot === "X");
      const checkWinnerORow = gameBoard[i].every((spot) => spot === "O");

      const checkWinnerXColumn = gameBoard.every((spot) => spot[i] === "X");
      const checkWinnerOColumn = gameBoard.every((spot) => spot[i] === "O");

      const checkTopDiagonalX = gameBoard.every(
        //index 0,0 1,1 2,2
        (row, index) => row[index] === "X"
      );
      const checkTopDiagonalO = gameBoard.every(
        (row, index) => row[index] === "O"
      );

      const checkBottomDiagonalX = ""; //TODO::::: index 0,2 1,1 2,0
      const checkBottomDiagonalO = "";

      const checkDraw = gameBoard.every((row) =>
        row.every((spot) => spot !== "")
      );

      if (
        checkWinnerXRow == true ||
        checkWinnerXColumn == true ||
        checkTopDiagonalX == true
      ) {
        winnerModal.showModal();
        winnerText.textContent = p1.name + " Wins!";
      } else if (
        checkWinnerORow == true ||
        checkWinnerOColumn == true ||
        checkTopDiagonalO == true
      ) {
        winnerModal.showModal();
        winnerText.textContent = p2.name + " Wins!";
      } else if (checkDraw == true) {
        winnerModal.showModal();
        winnerText.textContent = "It was a draw!";
      }
    }

    restartButton.addEventListener("click", () => {
      winnerModal.close();
      clearTextBoxes();
      turn = 0;
    });
    resetButton.addEventListener("click", () => {
      winnerModal.close();
      openModal();
      clearTextBoxes();
      turn = 0;
    });
  };
  return { writeChar };
})();

function getCellValue(row, column) {
  return document.getElementById(`cell-${row}${column}`).textContent;
}
