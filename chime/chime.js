const notes = ["A", "B", "C", "D", "E", "F", "G", "A2"];
var note0 = [0,0,0,0,0,0,0,0]
var note1 = [0,0,0,0,0,0,0,0]
var note2 = [0,0,0,0,0,0,0,0]
var note3 = [0,0,0,0,0,0,0,0]
var note4 = [0,0,0,0,0,0,0,0]
var note5 = [0,0,0,0,0,0,0,0]
var note6 = [0,0,0,0,0,0,0,0]
var note7 = [0,0,0,0,0,0,0,0]
var playing = true;
var currentNote = 0;


document.addEventListener("keydown", function () {


    // for every key press advanced the highlight
    $(".button.note" + String(currentNote)).addClass("active");
    
    $("button note" + String(currentNote)).addClass("active");

    if (currentNote === 0) {
        $(".button.note" + String(7)).removeClass("active");
    } else {
        $(".button.note" + String(currentNote-1)).removeClass("active");
    }

    if (currentNote === 7) {
        currentNote = 0;
    } else {
        currentNote += 1;
    }

    console.log("Current note: " + currentNote);


});


$(".button").on("mousedown", function () {
    // grab the note and pitch which was clicked
    thisNote = this.classList[1];
    thisPitch = this.classList[2];
    flashButton(thisNote, thisPitch);
    playNote(thisPitch);

});
      


// setTimeout(function (){
//     gameColor = randomColor();
//     gamePattern.push(gameColor);
//     flashButton(gameColor);
//     playSound(gameColor);
//     $("button h1").text("Level " + String(level+1));
//   }, 300); // pause in milliseconds

// }
