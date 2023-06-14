// Initialise constants
const swatch = ["#06D6A0", "#1B9AAA", "#EF476F", "#FFC43D", "#F8FFE5"];
const Colors = ["color1", "color2", "color3", "color4"];
let playing = false;
let gamePattern = [];
let playerPattern = [];
let gameColor = "";
let playerColor = "";
let level = 0;
let thisItem = 0;

$(document).ready( function() {
  setCopyrightYear();
});

// detect keypress to begin game
document.addEventListener("keydown", function () {
  if (playing === false) {

    // if game is not in progress, initialise it

    playing = true; // i.e. let's begin a game
    gamePattern = [];
    playerPattern = [];
    gameColor = "";
    playerColor = "";
    level = 0; // array index, so display as level+1
    thisItem = 0;
    $(".btn").addClass("hoverable");
    $("#game-title").css("display", "none");
    $("#game-over").css("display", "none");
    $("#level").text("Level " + String(level+1));
    $("#level").css("display", "block");
    $("#press-key").css("visibility", "hidden");


    setTimeout(function (){
      gameColor = randomColor();
      gamePattern.push(gameColor);
      flashButton(gameColor);
      playSound(gameColor);
    }, 400); // pause in milliseconds
  }
});

//with game in progress, check button clicks
$(".btn").on("mousedown", function () {
  if (playing === true) {

    // grab the color which was clicked
    playerColor = this.classList[1];
    flashButton(playerColor);
    
    gameColor = gamePattern[thisItem];
    console.log("Index:"+thisItem+" playerColor:" + playerColor + " gameColor:" + gameColor);

    //check if it's the right button
    if (playerColor === gameColor) {
      
      // if player matches current color, play the right sound
      playSound(playerColor);
      thisItem += 1;

      //if player has matched ALL colours, go to next level
      if (thisItem === gamePattern.length) {
        level += 1;

        // add another colour, and reset to start of pattern
        setTimeout(function (){
          $("#level").text("Level " + String(level+1));
          thisItem = 0;
          gameColor = randomColor();
          gamePattern.push(gameColor);
          flashButton(gameColor);
          playSound(gameColor);
        }, 300); // pause in milliseconds
         
      }  
      
    } else {
      
      // if not correct, play 'wrong' sound and end game
      playing = false;
      $(".btn").removeClass("hoverable");
      playSound("wrong");
      flashScreen();
      $("#game-over").css("display", "block");
      $("#game-title").css("display", "none");
      $("#level").css("display", "none");

      setTimeout(function (){
        $("#game-over").css("display", "none");
        $("#game-title").css("display", "block");
        $("#press-key").css("visibility", "visible");
      }, 2500); // pause in milliseconds

    }
  }
});

// pick a random color
function randomColor() {
  randomNumber = Math.floor(Math.random() * 4);
  newColor = Colors[randomNumber];
  return newColor;
}

// play a sound
function playSound(sound) {
  var newSound = new Audio("./sounds/" + sound + ".mp3");
  newSound.play();
}

// flash a button
function flashButton(buttonColor) {
  $(".btn." + buttonColor).addClass("pressed"); 
  $(".btn." + buttonColor).removeClass("pressed", 200);
}

// flash the game background
function flashScreen() {
  $(".game-container").addClass("error");
  $(".game-container").removeClass("error", 1500);
}

function setCopyrightYear() {
  let thisYear = new Date();
  $("#copyright-year").text(thisYear.getUTCFullYear());
}