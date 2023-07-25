let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
let pixels = document.getElementsByClassName("pixel");
let currentLetter = 0;

let interval = setInterval(flipLetters, 50);

function flipLetters(n) {

    // set all remaining letters to random characters, starting from the current letter
    for (j=currentLetter;j<pixels.length;j++) {
        randomChar = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        pixels[j].textContent = randomChar;
        // pixels[j].style.color = 'red';
    }
    
    // ... then set the current letter back to its original
    pixels[currentLetter].textContent = 'initial';
    // pixels[currentLetter].style.color = 'initial';

    // move on to the next letter
    currentLetter += 1;

    // if every letter has been flipped, stop
    if (currentLetter == pixels.length) {
        clearInterval(interval);
    }
}
