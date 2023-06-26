const swatch = ["#06D6A0", "#1B9AAA", "#EF476F", "#FFC43D", "#F8FFE5"];
const colors = ["color1", "color2", "color3", "color4"];
const players = ["X", "O"];

let board = [
  ["-", "-", "-", "-"],
  ["-", "-", "-", "-"],
  ["-", "-", "-", "-"],
  ["-", "-", "-", "-"],
];
let playing = true;
let gameOver = false;
let turn = players[0]; // set player X to start
let turnCount = 1;
let waiting = false;

$(document).ready(function () {
  // when page first loads, initialise game immediately
  $("#subtitle").text("Player X to start");
  $(".cell").addClass("hoverable");
});

$(document).on("click", function () {

  if (playing === false && gameOver === true) {
    $("#subtitle").text("Click to play again");
    gameOver = false;
    return;
  }

  if (playing === false && gameOver === false) {

    // clear the board and get ready to play again
    resetBoard();

    $(".board-container").removeClass("red");
    $(".cell").removeClass("green");
    $(".heading").removeClass('green');
    $(".heading").removeClass('red');
    $("#main-title").text("BIG TOE");
    $("#main-title").removeClass("animate");
    $("#subtitle").text("Player X to start");
    $(".cell").addClass("hoverable");

    turn = players[0]; // set player X to start
    turnCount = 1;
    playing = true;
    gameOver = false;
    waiting = false;
  }

});

// draw empty board and reset values to '-'
function resetBoard() {
  for (row = 0; row <= 3; row++) {
    for (col = 0; col <= 3; col++) {
      board[row][col] = '-';
      thisCell = "#c"+col+"r"+row;
      $(thisCell).text('');
    }
  }
}

// while playing, handle button clicks on cells
$(".cell").on("click", function () {
  if (playing === true) {
    thisCell = this.id;

    // REMEMBER the value of cell coordinate (2,1) is at board[1][2]
    col = thisCell[1]; // x value is column
    row = thisCell[3]; // y value is row  

    // check if the cell is available
    if (board[row][col] === "-") {
      board[row][col] = `${turn}`;
      $(this).text(`${turn}`);
      $(this).removeClass("hoverable");
      console.log(`${turnCount}: ${turn} chose ${thisCell}`);

      // check if player has won
      checkWin();
    }
  }
});

function checkWin() {
  // minimum 7 turns required for a win, saves CPU
  if (turnCount >= 7) {
    // check columns
    for (x = 0; x <= 3; x++) {
      theseCoords = [
        [x, 0],
        [x, 1],
        [x, 2],
        [x, 3],
      ];
      theseValues = [board[0][x], board[1][x], board[2][x], board[3][x]];

      // if this player's glyph is in this array 4 times, they've won
      if (theseValues.filter((item) => item === turn).length == 4) {
        playerWins(theseCoords);
        return;
      }
    }

    // check rows
    for (y = 0; y <= 3; y++) {
      theseCoords = [
        [0, y],
        [1, y],
        [2, y],
        [3, y],
      ];
      theseValues = [board[y][0], board[y][1], board[y][2], board[y][3]];
      if (theseValues.filter((item) => item === turn).length == 4) {
        playerWins(theseCoords);
        return;
      }
    }

    // check diagonal 1
    theseCoords = [
      [0, 0],
      [1, 1],
      [2, 2],
      [3, 3],
    ];
    theseValues = [board[0][0], board[1][1], board[2][2], board[3][3]];
    if (theseValues.filter((item) => item === turn).length == 4) {
      playerWins(theseCoords);
      return;
    }

    // check diagonal 2
    theseCoords = [
      [0, 3],
      [1, 2],
      [2, 1],
      [3, 0],
    ];
    theseValues = [board[3][0], board[2][1], board[1][2], board[0][3]];
    if (theseValues.filter((item) => item === turn).length == 4) {
      playerWins(theseCoords);
      return;
    }
  }

  // stalemate
  if (turnCount == 16) {
    $(".heading").addClass('red');
    $(".board-container").addClass('red');
    $(".cell").removeClass("hoverable");
    $("#main-title").text("STALEMATE!");
    $("#main-title").addClass("animate");
    playing = false;
    gameOver = true;
    turnCount = 1;
    return;
  }

  // if no win and no stalemate, continue to next player
  if (playing === true) {
    turnCount++;
    if (turn == players[0]) {
      turn = players[1];
    } else {
      turn = players[0];
    }
    $("#subtitle").text(`Player ${turn} to play`);
  }
}

function playerWins(cellCoords) {
  $("#main-title").addClass("animate");
  $("#main-title").text(`${turn} wins!`);
  $(".heading").addClass('green');
  $("#subtitle").text('');
  $(".cell").removeClass("hoverable");

  highlightCells(cellCoords);
  playing = false;
  gameOver = true;
  waiting = false;
}

function highlightCells(cells){
  // cells is coords = [[x1][y1],[x2][y2],[x3][y3],...]
  for (i = 0; i < cells.length; i++) {
    cell = $("#c" + cells[i][0] + "r" + cells[i][1]);
    cell.addClass("green");
  }
}

// NOT CURRENTLY IMPLEMENTED
function flashCells(cells) {
  // cells is coords = [[x1][y1],[x2][y2],[x3][y3],...]
  for (i = 0; i < cells.length; i++) {
    cell = $("#c" + cells[i][0] + "r" + cells[i][1]);
    cell.addClass("flashing");
  }
  setTimeout(function () {
    for (i = 0; i < cells.length; i++) {
      cell = $("#c" + cells[i][0] + "r" + cells[i][1]);
      cell.removeClass("flashing");
    }
  }, 3000);
}