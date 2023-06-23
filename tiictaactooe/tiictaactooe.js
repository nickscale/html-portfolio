const defaultBoard = [
  ["-", "-", "-", "-"],
  ["-", "-", "-", "-"],
  ["-", "-", "-", "-"],
  ["-", "-", "-", "-"],
];
const swatch = ["#06D6A0", "#1B9AAA", "#EF476F", "#FFC43D", "#F8FFE5"];
const Colors = ["color1", "color2", "color3", "color4"];

let board = defaultBoard;
let playing = true;
let gamePattern = [];
let playerColor = "";
let turn = "X";
let turnCount = 1;

// detect keypress to begin game -- CHANGE THIS, MAKE ALL MOUSE/TOUCH ONLY
document.addEventListener("keydown", function () {
  if (playing === false) {
    // if game is not in progress, initialise it

    playing = true; // i.e. let's begin a game
    $('board-container').removeClass(flash);
    board = defaultBoard;
    turn = "X";

    updateStatus("X to play");

    $(".cell").addClass("hoverable");

    setTimeout(function () {
      gameColor = randomColor();
      gamePattern.push(gameColor);
      flashButton(gameColor);
      playSound(gameColor);
    }, 400); // pause in milliseconds
  }
});

//with game in progress, handle button clicks
$(".cell").on("mousedown", function () {
  thisCell = this.id;
  row = thisCell[1];
  col = thisCell[3];

  if (playing === true) {
    // check the cell is available
    if (board[row][col] === "-") {
      board[row][col] = `${turn}`;
      this.innerText = `${turn}`;
      console.log(`${turnCount}: player ${turn} chose ${thisCell}`);

      // check win state
      checkWin();

      // swap to next player
      if (playing === true) {
        turnCount++;
        if (turn == "X") {
          turn = "O";
          updateStatus("Player O to play");
        } else {
          turn = "X";
          updateStatus("Player X to play");
        }
      }
    }
  }
});

function updateBoard() {
  for (row = 0; row <= 3; row++) {
    for (col = 0; col <= 3; col++) {
      // console.log(`r${row}c${col} = ${board[row][col]}`);
      thisElement = document.getElementById("r" + row + "c" + col);
      thisElement.innerText = board[row][col];
    }
  }
}

function checkWin() {
  let thisString = "";

  if (playing === true) {
    // check columns

    for (row = 0; row <= 3; row++) {
      for (col = 0; col <= 3; col++) {
        thisString += board[row][col];
      }
      
      // console.log(`Check row${row}: ${thisString}`);
      if (thisString === "XXXX") {
        updateStatus("Player X filled a column!");
        flashBoard();
        playing = false;
      } else if (thisString == "OOOO") {
        updateStatus("Player O filled a column!");
        flashBoard();
        playing = false;
      } else if (turnCount == 16) {
        updateStatus("Stalemate!");
        flashBoard();
        playing = false;
      }

      thisString = "";
    }

    // check rows
    for (col = 0; col <= 3; col++) {
      for (row = 0; row <= 3; row++) {
        thisString += board[row][col];
      }

    //   console.log(`Check col${col}: ${thisString}`);

      if (thisString === "XXXX") {
        updateStatus("Player X filled a row!");
        flashBoard();
        playing = false;
      } else if (thisString == "OOOO") {
        updateStatus("Player O filled a row!");
        flashBoard();
        playing = false;
      }

      thisString = "";
    }

    // check diagonals
    diag1 = board[0][0] + board[1][1] + board[2][2] + board[3][3];
    diag2 = board[0][3] + board[1][2] + board[2][1] + board[3][0];
    // console.log(`Check diag1: ${diag1}`);
    // console.log(`Check diag2: ${diag2}`);
    if (diag1 === "XXXX" || diag2 === "XXXX") {
      updateStatus("Player X got a diagonal!");
      flashBoard();
      playing = false;
    } else if (diag1 === "OOOO" || diag2 === "OOOO") {
      updateStatus("Player O got a diagonal!");
      flashBoard();
      playing = false;
    }
  }
}

function flashBoard () {
  let thisBoard = $('#board-container');
  thisBoard.addClass("flash");
  setTimeout(function() {thisBoard.removeClass("flash")}, 1000);
}

function updateStatus(string) {
  $("#subtitle").text(string);
}

/* various useful functions */

function setCopyrightYear() {
  let thisYear = new Date();
  document.getElementById("copyright-year").textContent = thisYear.getUTCFullYear();
}

setCopyrightYear();
updateStatus("Player X to play");
