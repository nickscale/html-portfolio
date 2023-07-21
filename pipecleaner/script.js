let pipe = [
    [0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
];
  
let nowPlaying = false;
let gameOver = false;
let playing;
let currentBeat = 0;
let speed = 500;

let track = 58; /* track angle, 60deg max */

function playGame() {
    if (nowPlaying == false) {
      currentBeat = 0;
      nowPlaying = true;
      iteration = 0;
    
      // start playing with interval timer
      playing = setInterval(function () {
        updatePipe();
        iteration++;
  
      }, speed);
    } else if (nowPlaying == true) {
  
      // if tempo changed, stop and restart at new tempo
      if (gameOver == true) {
        console.log("Game over");
        clearInterval(playing);
        nowPlaying = false;
        gameOver = false;
        playPattern();
      } else {
        
        // if game over is triggered, stop playing
        clearInterval(playing);
        nowPlaying = false;
        console.log("Stop playing");
      }
      return;
    }
  }
  

function updatePipe() {
    let incoming = [0,0,0,0,0,0];
    let randEle = Math.floor(Math.random() * 7);
    let segmentList = document.getElementsByClassName("div.segment.seg1")
    
    incoming[randEle] = 1;
    pipe.pop();
    pipe.unshift(incoming);
    // console.log(pipe);
    // console.log(`Play i${iteration} seg${randEle}`);
    // console.log(segmentList);
    
    for (i=0; i<7; i++) {
         document.getElementsByClassName("div.segment.seg1").css("background", "conic-gradient(transparent 0deg calc("+60*i+"deg - var(--track)), var(--enemy) calc("+60*i+"deg - var(--track)) "+60*i+"deg, transparent "+60*i+"deg 360deg)");
    }
}
  
function setGradient (i, thisElement, state) {
    thisElement.style.background = 
    "conic-gradient(transparent 0deg calc("
    + 60*(i+1)
    + "deg - 58deg), #f00 calc("
    + 60*(i+1)
    + "deg - 58deg) "
    + 60*(i+1)
    + "deg, transparent "
    + 60*(i+1)
    + "deg 360deg)"
  }

$(document).ready(function () {
    playGame();
});
  