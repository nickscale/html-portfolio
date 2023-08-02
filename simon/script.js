// Initialise constants
const swatch = ["#06D6A0", "#1B9AAA", "#EF476F", "#FFC43D", "#F8FFE5"];
const Colors = ["color1", "color2", "color3", "color4"];
let playing = false;
let gameOver = false;

let gamePattern = [];
let playerPattern = [];
let gameColor = "";
let playerColor = "";
let level = 0;
let thisItem = 0;

// detect mouse clicks
$(document).on("click", function () {

  // if game is not in progress or over, initialise it
  if (playing === false && gameOver === false) {
  
    playing = true; // i.e. let's begin a game
    gamePattern = [];
    playerPattern = [];
    gameColor = "";
    playerColor = "";
    level = 0; // array index, so display as level+1
    thisItem = 0;

    $("#title-splash").css("display", "none");
    $("#status").text("Level " + String(level+1));
    $("#board-container").css("display", "block");
    $(".btn").addClass("hoverable");
    
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
    console.log("Index:"+thisItem+" player:" + playerColor + " game:" + gameColor);

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
          $("#status").text("Level " + String(level+1));
          thisItem = 0;
          gameColor = randomColor();
          gamePattern.push(gameColor);
          flashButton(gameColor);
          playSound(gameColor);
        }, 350); // pause in milliseconds         
      }        
    } else {
      
      // if incorrect, play 'wrong' sound and end game
      playing = false;
      gameOver = true;
      playSound("wrong");
      flashScreen();
      $(".btn").removeClass("hoverable");
      $("#title-splash").css("display", "block");
      $("#main-title").text("Game Over");

      // then after a delay, reset back to title page
      setTimeout(function (){
        $("#board-container").css("display", "none");
        $("#main-title").text("Simple Simon");
        $("#status").text("Tap to begin");
        gameOver = false;
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