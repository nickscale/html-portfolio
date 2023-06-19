const defaultBoard = 
[['', '', '', ''],
['', '', '', ''],
['', '', '', ''],
['', '', '', '']];
const swatch = ["#06D6A0", "#1B9AAA", "#EF476F", "#FFC43D", "#F8FFE5"];
const Colors = ["color1", "color2", "color3", "color4"];

let board = defaultBoard;
let playing = false;
let gamePattern = [];
let playerColor = "";
let turn = 'X';

// detect keypress to begin game -- CHANGE THIS, MAKE ALL MOUSE/TOUCH ONLY
document.addEventListener("keydown", function () {

    if (playing === false) {
  
      // if game is not in progress, initialise it
  
      playing = true; // i.e. let's begin a game
      board = defaultBoard;
      turn = 'X';

      updateStatus("X to play");

      $(".cell").addClass("hoverable");
  
      setTimeout(function (){
        gameColor = randomColor();
        gamePattern.push(gameColor);
        flashButton(gameColor);
        playSound(gameColor);
      }, 400); // pause in milliseconds
    }
  });
  
  
//with game in progress, handle button clicks
$(".btn").on("mousedown", function () {

    if (playing === true) {

      // grab the color which was clicked
      thisCell = this.id;
      console.log("cell:",thisCell,"turn:",turn);

        // check the cell is available
        if (thisCell === available) {

            playSound(click);

            // update the board array
            
            // redraw the board

            // check win state
            if (thisItem === gamePattern.length) {
                level += 1;          
              }  
                  
            // switch to next player 
  
        
        //if player has matched ALL colours, go to next level
        checkWin();
      } 
    }
  });
  
  

function updateBoard() {
    for (row=0;row<=3;row++) {
        for (col=0;col<=3;col++) {
            console.log(`r${row}c${col} = ${board[row][col]}`);
            thisElement = document.getElementById("r"+row+"c"+col);
            thisElement.textContent = board[row][col];
        }
    }
}

function updateStatus (string) {
 $("#subtitle").text(string);
}

function checkWin () {

    console.log(board.join());

    // check horizontals
    for (row=0;row<=4;row++) {
    thisRow = [board[row][0],board[row][1],board[row][2],board[row][3]];
        if (thisRow.join() === "XXXX") {
            console.log("Player X has won");
        } else if (thisRow.join() === "OOOO") {
            console.log("Player O has won");
        }
    }

    // check verticals
    for (col=0;col<=4;col++) {
        thisCol = [board[0][col],board[1][col],board[2][col],board[3][col]];
        if (thisCol.join() === "XXXX") {
            console.log("Player X has won");
        } else if (thisCol.join() === "OOOO") {
            console.log("Player O has won");
        }
    }

    // check diagonals
    diag1 = [board[0][0],board[1][1],board[2][2],board[3][3]];
    diag2 = [board[0][3],board[1][2],board[2][1],board[3][0]];
    if (diag1.join() === "XXXX") {
        console.log("Player X has won");
    } else if (diag1.join() === "OOOO") {
        console.log("Player O has won");
    }
    if (diag2.join() === "XXXX") {
        console.log("Player X has won");
    } else if (diag2.join() === "OOOO") {
        console.log("Player O has won");
    }

}
  
updateStatus("status goes here");
updateBoard();