const notes = ["C", "D", "E", "F", "G", "A", "B", "C2"];
const pattern = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
const percussion = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

let nowPlaying = false;
let playing;
let currentBeat = 0;
let beatLength = 250; // ms

$(document).ready(function () {
  $(".button").addClass("hoverable");
  $(".button").text(""); // disable this to show cell ids
  //   playNote(0);
});

$(".button").on("mouseover", function () {
  // grab the note and pitch which was clicked
  thisBeat = this.id[2];
  thisPitch = this.id[5];
  playNote(thisPitch);
});

// click to set a note
$(".button").on("click", function () {
  thisBeat = this.id[2];
  thisPitch = this.id[5];
  thisArray = pattern[thisBeat];

  // if already selected, unselect it
  if ($(this).hasClass("selected")) {
    $(this).removeClass("selected");
    thisArray[thisPitch] = 0;
  } else {
    $(this).addClass("selected");
    thisArray[thisPitch] = 1;
  }

  // for the rest, unselect them
  for (i = 0; i <= 7; i++) {
    if (i != thisPitch) {
      thisArray[i] = 0;
      $(`#b0${thisBeat}p0${i}`).removeClass("selected");
    }
  }
  console.log(`CLICK b0${thisBeat}p0${thisPitch}, pattern[${thisBeat}]=${pattern[thisBeat]}`);
});

$(".button").on("mousedown", function () {
  $(this).addClass("highlighted");
});

$(".button").on("mouseleave", function () {
  $(this).removeClass("highlighted");
});

function playPERCNote(perc) {
  switch (Number(perc)) {
    case 1:
      var newPerc = new Audio("./sounds/snare.mp3");
      break;
    case 2:
      var newPerc = new Audio("./sounds/closed-hi-hat.mp3");
      break;
    case 3:
      var newPerc = new Audio("./sounds/open-hi-hat.mp3");
      break;
    case 4:
      var newPerc = new Audio("./sounds/clap.mp3");
      break;
    case 5:
      var newPerc = new Audio("./sounds/tambourine.wav");
      break;
    case 6:
      var newPerc = new Audio("./sounds/FX1.mp3");
      break;
    case 7:
      var newPerc = new Audio("./sounds/FX1.mp3");
      break;
    default:
      var newPerc = new Audio("./sounds/kick.mp3");
      break;
  }
  newPerc.play();
}

// play through currently selected PERCUSSION notes
function playPERCPattern() {
  if (nowPlaying == false) {
    currentBeat = 0;
    nowPlaying = true;

    // toggle play/pause button
    $("#btn-play").css("display", "none");
    $("#btn-pause").css("display", "inline-block");

    // start playing with interval timer
    playing = setInterval(function () {
      console.log(`Playing pattern${currentBeat}=${pattern[currentBeat]}`);

      // find selected pitch at this beat
      thisPitch = pattern[currentBeat].indexOf(1);

      // highlight the buttons on the current beat
      $(".button").removeClass("highlighted");
      $(`.button[id^="b0${currentBeat}"]`).addClass("highlighted");

      // only play note if there is a note is selected
      if (thisPitch >= 0) {
        playNote(thisPitch);
      }

      // loop from beat 7 back to beat 0
      if (currentBeat == 7) {
        currentBeat = 0;
      } else {
        currentBeat++;
      }
    }, beatLength);
  } else if (nowPlaying == true) {
    // if playing, stop playing
    clearInterval(playing);
    nowPlaying = false;
    console.log("Stop playing");

    // toggle play/pause button, remove highlighting
    $("#btn-play").css("display", "inline-block");
    $("#btn-pause").css("display", "none");
    $(".button").removeClass("highlighted");

    return;
  }
}

// play notes at appropriate pitch
function playNote(pitch = 0) {
  var newSound = new Audio("./sounds/Synth_C (5)-single.mp3");
  newSound.preservesPitch = false;

  // alter playback rate of sample to set pitch
  switch (Number(pitch)) {
    case 1:
      newSound.playbackRate = 1.122;
      break;
    case 2:
      newSound.playbackRate = 1.26;
      break;
    case 3:
      newSound.playbackRate = 1.335;
      break;
    case 4:
      newSound.playbackRate = 1.498;
      break;
    case 5:
      newSound.playbackRate = 1.682;
      break;
    case 6:
      newSound.playbackRate = 1.888;
      break;
    case 7:
      newSound.playbackRate = 2.0;
      break;
    default:
      newSound.playbackRate = 1.0;
      break;
  }
  newSound.play();
}

// play through currently selected notes
function playPattern() {
  if (nowPlaying == false) {
    currentBeat = 0;
    nowPlaying = true;

    // toggle play/pause button
    $("#btn-play").css("display", "none");
    $("#btn-pause").css("display", "inline-block");

    // start playing with interval timer
    playing = setInterval(function () {
      console.log(`Playing pattern${currentBeat}=${pattern[currentBeat]}`);

      // find selected pitch at this beat
      thisPitch = pattern[currentBeat].indexOf(1);

      // highlight the buttons on the current beat
      $(".button").removeClass("highlighted");
      $(`.button[id^="b0${currentBeat}"]`).addClass("highlighted");

      // only play note if there is a note is selected
      if (thisPitch >= 0) {
        playNote(thisPitch);
      }

      // loop from beat 7 back to beat 0
      if (currentBeat == 7) {
        currentBeat = 0;
      } else {
        currentBeat++;
      }
    }, beatLength);
  } else if (nowPlaying == true) {
    // if playing, stop playing
    clearInterval(playing);
    nowPlaying = false;
    console.log("Stop playing");

    // toggle play/pause button, remove highlighting
    $("#btn-play").css("display", "inline-block");
    $("#btn-pause").css("display", "none");
    $(".button").removeClass("highlighted");

    return;
  }
}

// randomly choose some notes
function randomise() {
  // clear current button selection
  $(`.button`).removeClass("selected");

  for (i = 0; i <= 7; i++) {
    // clear current note
    pattern[i].fill(0, 0, 8);

    // choose a pitch at random (8 = leave empty)
    randomPitch = Math.floor(Math.random() * 9);
    console.log(`Random pattern${i}=${pattern[i]}`);
    if (randomPitch <= 7) {
      pattern[i][randomPitch] = 1;
      $(`#b0${i}p0${randomPitch}`).addClass("selected");
    }
  }
}

// clear all current notes
function clearPattern() {
  console.log(`Clear pattern`);
  $(`.button`).removeClass("selected");
  for (i = 0; i <= 7; i++) {
    pattern[i].fill(0, 0, 8);
  }
}
