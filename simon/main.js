// Initialise constants
const Colors = ["green", "red", "yellow", "blue"];
var playing = false;
var gamePattern = [];
var playerPattern = [];
var gameColor = "";
var playerColor = "";
var level = 0;
var thisItem = 0;

// detect keypress to begin game
document.addEventListener("keydown", function () {
  if (playing === false) {

    // if game is not in progress, initialise it

    playing = true; // i.e. let's begin a game
    gamePattern = [];
    playerPattern = [];
    gameColor = "";
    playerColor = "";
    level = 0; // Used as index, so displayed level is level+1
    thisItem = 0;
    $(".btn").addClass("hoverable");
    $("#game-over").css("display", "none");
    $("#instructions").css("display", "none");


    setTimeout(function (){
      gameColor = randomColor();
      gamePattern.push(gameColor);
      flashButton(gameColor);
      playSound(gameColor);
      $("#main-title h1").text("Level " + String(level+1));
    }, 300); // pause in milliseconds

  } else {
    console.log("Keydown during play - no action");
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
          $("#main-title h1").text("Level " + String(level+1));
          thisItem = 0;
          gameColor = randomColor();
          gamePattern.push(gameColor);
          flashButton(gameColor);
          playSound(gameColor);
        }, 300); // pause in milliseconds
         
      }  
      
    } else {
      
      // if not correct, play 'wrong' sound and end game
      $(".btn").removeClass("hoverable");
      playSound("wrong");
      flashScreen();
      playing = false;
      // $("#game-over").css("display", "block");
      $("#main-title h1").text("Game over!");
      $("#instructions").css("display", "block");
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
  $(".game-container").removeClass("error" , 200);
}

function delay(milliseconds){
  return new Promise(resolve => {
      setTimeout(resolve, milliseconds);
  });
}
