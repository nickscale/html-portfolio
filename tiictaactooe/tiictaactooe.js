let row0 = [0, 0, 0, 0];
let row1 = [0, 0, 0, 0];
let row2 = [0, 0, 0, 0];
let row3 = [0, 0, 0, 0];
let col0 = [row0[0],row1[0],row2[0],row3[0]];
let col1 = [row0[1],row1[1],row2[1],row3[1]];
let col2 = [row0[2],row1[2],row2[2],row3[2]];
let col3 = [row0[3],row1[3],row2[3],row3[3]];
let board = [[row0],[row1],[row2],[row3]];

let isPlaying = false;

function playGame() {


}

function updateBoard() {
    for (row=0;row<=3;row++){
        for (col=0;col<=3;col++){
            console.log(`#r${row}c${col} = `);
            value = 
            $("#r"+row+"0c"+col).text(row0[col]);
        }
    }

    // $("#r1c0").text(row1[0]);
    // $("#r1c1").text(row1[1]);
    // $("#r1c2").text(row1[2]);
    // $("#r1c3").text(row1[3]);
    // $("#r2c0").text(row2[0]);
    // $("#r2c1").text(row2[1]);
    // $("#r2c2").text(row2[2]);
    // $("#r2c3").text(row2[3]);
    // $("#r3c0").text(row3[0]);
    // $("#r3c1").text(row3[1]);
    // $("#r3c2").text(row3[2]);
    // $("#r3c3").text(row3[3]);
}

function updateStatus (string) {
 $("#subtitle").text(string);
 console.log("UPDATE");
}

updateStatus("Testing");
updateBoard();