const notes = ["C", "D", "E", "F", "G", "A", "B", "C2"];
let melody = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
let percussion = [
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
let mode = "synth";

$(document).ready(function () {
  $('.button').text(this.id);
});

// hover over button to play the note
$(".button").on("mouseover", function () {
  // grab the note and pitch which was clicked
  thisBeat = this.id[2];
  thisPitch = this.id[5];
  $(this).addClass("highlight");
  if (mode === "synth") {
    playNote(thisPitch, -1); // if in synth mode
  } else if (mode === "perc") {
    playNote(-1, thisPitch); // if in perc mode
  }
});

$(".button").on("mouseleave", function () {
  $(this).removeClass("highlight");
});

// click on button to set the note
$(".button").on("click", function () {
  thisBeat = this.id[2];
  thisPitch = this.id[5];

  if (mode === "synth") {
    // FOR SYNTH MODE

    thisArray = melody[thisBeat];

    // if button already selected, unselect it
    if ($(this).hasClass("select-green")) {
      $(this).removeClass("select-green");
      thisArray[thisPitch] = 0;
    } else {
      $(this).addClass("select-green");
      thisArray[thisPitch] = 1;
    }

    // for the rest, unselect them
    for (i = 0; i <= 7; i++) {
      if (i != thisPitch) {
        thisArray[i] = 0;
        $(`#b0${thisBeat}p0${i}`).removeClass("select-green");
      }
    }
    console.log(`Clicked b0${thisBeat}p0${thisPitch}: m[${thisBeat}]=${melody[thisBeat].join("")}`);
  } else if (mode === "perc") {
    // FOR PERC MODE

    thisArray = percussion[thisBeat];

    // if button already selected, unselect it
    if ($(this).hasClass("select-red")) {
      $(this).removeClass("select-red");
      thisArray[thisPitch] = 0;
    } else {
      $(this).addClass("select-red");
      thisArray[thisPitch] = 1;
    }

    // for the rest, unselect them
    for (i = 0; i <= 7; i++) {
      if (i != thisPitch) {
        thisArray[i] = 0;
        $(`#b0${thisBeat}p0${i}`).removeClass("select-red");
      }
    }
    console.log(`Clicked b0${thisBeat}p0${thisPitch}: p[${thisBeat}]=${percussion[thisBeat].join("")}`);
  }
});

// play through currently selected notes
function playPattern() {
  if (nowPlaying == false) {
    currentBeat = 0;
    nowPlaying = true;

    // toggle display of play/pause buttons
    $("#btn-play").css("display", "none");
    $("#btn-pause").css("display", "inline-block");

    // start playing with interval timer
    playing = setInterval(function () {

      console.log(`Playing ${currentBeat} m${melody[currentBeat].join("")} p${percussion[currentBeat].join("")}`);

      // find selected pitch at this beat
      // returns -1 if no pitch is selected
      thisPitch = melody[currentBeat].indexOf(1);
      thisPerc = percussion[currentBeat].indexOf(1);

      // highlight all notes of the current beat, except the selected note
      $(".button").removeClass("highlight");
      for (p=0;p<=7;p++) {
        if (mode === 'synth' && p != thisPitch) {
          $(`#b0${currentBeat}p0${p}`).addClass("highlight");
        } else if (mode === 'perc' && p != thisPerc) {
          $(`#b0${currentBeat}p0${p}`).addClass("highlight");
        }
      }
    
      // only play note if there is a note is selected
      switch (true) {
        case thisPitch >= 0 && thisPerc >= 0:
          playNote(thisPitch, thisPerc);
        case thisPitch >= 0 && thisPerc < 0:
          playNote(thisPitch, -1);
        case thisPitch < 0 && thisPerc >= 0:
          playNote(-1, thisPerc);
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

    // toggle display of play/pause buttons
    $("#btn-play").css("display", "inline-block");
    $("#btn-pause").css("display", "none");

    // remove any highlighting
    $(".button").removeClass("highlight");

    return;
  }
}

// play the notes at the current beat
function playNote(pitch, perc) {
  // play a melodic note, adjusted for pitch
  var thisNote = new Audio("./sounds/Synth_C (5)-single.mp3");
  thisNote.preservesPitch = false;

  // alter playback rate of sample to set pitch
  switch (Number(pitch)) {
    case -1:
      // don't play a note, e.g. when in perc mode
      thisNote = undefined;
      break;
    case 1:
      thisNote.playbackRate = 1.122;
      break;
    case 2:
      thisNote.playbackRate = 1.26;
      break;
    case 3:
      thisNote.playbackRate = 1.335;
      break;
    case 4:
      thisNote.playbackRate = 1.498;
      break;
    case 5:
      thisNote.playbackRate = 1.682;
      break;
    case 6:
      thisNote.playbackRate = 1.888;
      break;
    case 7:
      thisNote.playbackRate = 2.0;
      break;
    default:
      thisNote.playbackRate = 1.0;
      break;
  }

  switch (Number(perc)) {
    case -1:
      // don't play a perc hit, e.g. in synth mode
      thisPerc = undefined;
      break;
    case 1:
      var thisPerc = new Audio("./sounds/snare.mp3");
      break;
    case 2:
      var thisPerc = new Audio("./sounds/closed-hi-hat.mp3");
      break;
    case 3:
      var thisPerc = new Audio("./sounds/open-hi-hat.mp3");
      break;
    case 4:
      var thisPerc = new Audio("./sounds/clap.mp3");
      break;
    case 5:
      var thisPerc = new Audio("./sounds/tambourine.wav");
      break;
    case 6:
      var thisPerc = new Audio("./sounds/FX1.mp3");
      break;
    case 7:
      var thisPerc = new Audio("./sounds/FX1.mp3");
      break;
    default:
      var thisPerc = new Audio("./sounds/kick.mp3");
      break;
  }

  if (thisNote != undefined) {
    thisNote.play();
  }
  if (thisPerc != undefined) {
    thisPerc.play();
  }
}

// toggle between 'synth' or 'perc' modes
$("#toggle-mode").on("change", (e) => {
  $(`.button`).removeClass("select-green");
  $(`.button`).removeClass("select-red");

  this.checkboxValue = e.target.checked;


  if (this.checkboxValue === true) {
    mode = "perc";

    // update board to display percussion[][] values
    for (b = 0; b <= 7; b++) {
      for (p = 0; p <= 7; p++) {
        if (percussion[b][p] === 1) {
          $(`#b0${b}p0${p}`).addClass("select-red");
        }
      }
    }
  } else if (this.checkboxValue === false) {
    mode = "synth";

    // update board to display melody[][] values
    for (b = 0; b <= 7; b++) {
      for (p = 0; p <= 7; p++) {
        if (melody[b][p] === 1) {
          $(`#b0${b}p0${p}`).addClass("select-green");
        }
      }
    }
  }
  console.log(`Mode set to ${mode}`);
});


// randomly fill some notes
function randomise() {
  console.log("Randomising");
  // clear current button selections
  $(`.button`).removeClass("select-green");
  $(`.button`).removeClass("select-red");


  if (mode === "synth") {
    for (b = 0; b <= 7; b++) {
      // clear current note
      melody[b].fill(0, 0, 8);

      // choose a pitch at random (8 = leave empty)
      randomPitch = Math.floor(Math.random() * 9);
      if (randomPitch <= 7) {
        melody[b][randomPitch] = 1;
        $(`#b0${b}p0${randomPitch}`).addClass("select-green");
      }
      console.log(`Random m${b}=${melody[b].join('')}`);
    }
  }

  if (mode === "perc") {
    for (b = 0; b <= 7; b++) {
      // clear current beat
      percussion[b].fill(0, 0, 8);

      // choose a pitch at random (8 = leave empty)
      randomPitch = Math.floor(Math.random() * 9);
      if (randomPitch <= 7) {
        percussion[b][randomPitch] = 1;
        $(`#b0${b}p0${randomPitch}`).addClass("select-red");
      }
      console.log(`Random p${b}=${percussion[b].join('')}`);
    }
  }
}

// clear all current notes
function clearPattern() {
  console.log("Clear pattern");

  if (mode === "synth") {
    $(`.button`).removeClass("select-green");
    for (i = 0; i <= 7; i++) {
      melody[i].fill(0, 0, 8);
    }
  }

  if (mode === "perc") {
    $(`.button`).removeClass("select-red");
    for (i = 0; i <= 7; i++) {
      percussion[i].fill(0, 0, 8);
    }
  }
}