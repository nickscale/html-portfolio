const defaultBoard = [
  ["-", "-", "-", "-"],
  ["-", "-", "-", "-"],
  ["-", "-", "-", "-"],
  ["-", "-", "-", "-"]
];
const swatch = ["#06D6A0", "#1B9AAA", "#EF476F", "#FFC43D", "#F8FFE5"];
const players = ["X", "O"];
const colors = ["color1", "color2", "color3", "color4"];

let board = defaultBoard;
let playing = false;
let turn = players[0];
let turnCount = 1;
let refresh = true;

// click to begin a game
document.addEventListener("click", function () {
  if (playing === false && refresh === true) {
    // if game is not in progress, initialise it
    initialiseGame();
    refresh = false;
  }
});

function initialiseGame () {
  playing = true; // i.e. let's begin a game
  $("#board-container").removeClass("red");
  $(".cell").addClass("hoverable");
  turn = players[0];
  turnCount = 1;
  board = defaultBoard;
  resetBoard();
  $("#subtitle").text('Click to begin');
  console.log("Initialised game");
}

// during play, handle button clicks
$(".cell").on("mousedown", function () {
  thisCell = this.id;
  col = thisCell[1]; // e.g. x value is column
  row = thisCell[3]; // e.g. y value is row

  // REMEMBER: coordinate (2,1) refers to board[1][2] !!!!

  if (playing === true) {
    // check the cell is available
    if (board[row][col] === "-") {
      board[row][col] = `${turn}`;
      this.innerText = `${turn}`;
      $(this).removeClass("hoverable");
      console.log(`${turnCount}: player ${turn} chose ${thisCell}`);

      // check win state
      checkWin();
    }
  }
});

function resetBoard() {
  console.log("Resetting board");
  for (row = 0; row <= 3; row++) {
    for (col = 0; col <= 3; col++) {
      thisCell = $("#c" + col + "r" + row);
      if (board[row][col] === '-') {
        thisCell.innerText = '';
      } else {
        thisCell.innerText = board[row][col];
      }
    }
  }
}

function checkWin() {
  // minimum 7 turns required before anyone can win
  if (turnCount >= 7 && playing === true) {
    // check columns
    for (x = 0; x <= 3; x++) {
      theseCoords = [[x,0],[x,1],[x,2],[x,3]];
      theseValues = [board[0][x], board[1][x], board[2][x], board[3][x]];

      // if this player is in this array 4 times...
      if (theseValues.filter((item) => item === turn).length == 4) {
        $("#subtitle").text(`Player ${turn} has won! [COL]`);
        $(".cell").removeClass("hoverable");
        flashCells(theseCoords);
        playing = false;

        setTimeout(function (){
          initialiseGame();
          return true;
        }, 2500); // pause in ms
      }
    }

    // check rows
    for (y = 0; y <= 3; y++) {
      theseCoords = [[0,y],[1,y],[2,y],[3,y]];
      theseValues = [board[y][0], board[y][1], board[y][2], board[y][3]];

      // if this player is in this array 4 times...
      if (theseValues.filter((item) => item === turn).length == 4) {
        $("#subtitle").text(`Player ${turn} has won! [ROW]`);
        $(".cell").removeClass("hoverable");
        flashCells(theseCoords);
        playing = false;

        setTimeout(function (){
          initialiseGame();
          return true;
        }, 2500); // pause in ms
      }
    }

    // check diagonal 1
    theseCoords = [[0, 0],[1, 1],[2, 2],[3, 3]];
    theseValues = [board[0][0], board[1][1], board[2][2], board[3][3]];
    if (theseValues.filter((item) => item === turn).length == 4) {
      $("#subtitle").text(`Player ${turn} has won! [DIAG]`);
      $(".cell").removeClass("hoverable");
      flashCells(theseCoords);
      playing = false;

      setTimeout(function (){
        initialiseGame();
        return true;
      }, 2500); // pause in ms
    }

    // check diagonal 2
    theseCoords = [[0, 3],[1, 2],[2, 1],[3, 0]];
    theseValues = [board[3][0], board[2][1], board[1][2], board[0][3]];
    if (theseValues.filter((item) => item === turn).length == 4) {
      $("#subtitle").text(`Player ${turn} has won! [DIAG]`);
      $(".cell").removeClass("hoverable");
      flashCells(theseCoords);
      playing = false;

      setTimeout(function (){
        initialiseGame();
        return true;
      }, 2500); // pause in ms
    }
  }

  // stalemate
  if (turnCount == 16) {
    $("#subtitle").text("It's a stalemate!");
    $(".cell").removeClass("hoverable");
    $("#board-container").addClass("red");
    playing = false;

    setTimeout(function (){
      initialiseGame();
      return true;
    }, 2500); // pause in ms
  }

  // if no win and no stalemate, continue to next player
  if (playing === true) {
    turnCount++;
    if (turn == players[0]) {
      turn = players[1];
      $("#subtitle").text(`Player ${turn} to play.`);
    } else {
      turn = "X";
      $("#subtitle").text(`Player ${turn} to play.`);
    }
  }
}

function flashCells(arr) {
  // arr is coordinates = [[x1][y1],[x2][y2],[x3][y3],...]
  console.log("Flashing", arr);
  for (i = 0; i < arr.length; i++) {
    cell = $("#c" + arr[i][0] + "r" + arr[i][1]);
    cell.addClass("flash");
  }
  setTimeout(function () {
    for (i = 0; i < arr.length; i++) {
      cell = $("#c" + arr[i][0] + "r" + arr[i][1]);
      cell.removeClass("flash");
    }
  }, 3000);
}

function flashBoard() {
  $("#board-container").addClass("flash-red");
  setTimeout(function () {
    $("#board-container").removeClass("flash-red");
  }, 3000);
}

function allEqual(array) {
  for (i = 1; i < array.length - 1; i++) {
    if (array[i] !== array[0]) {
      return false;
    } else {
      return true;
    }
  }
}

/* various useful functions */

function setCopyrightYear() {
  let thisYear = new Date();
  document.getElementById("copyright-year").textContent = thisYear.getUTCFullYear();
}
setCopyrightYear();