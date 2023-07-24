let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
let originalLetters = ''
let pixels = document.getElementsByClassName("pixel");

// save the original letters to be restored later
for (i=0;i<pixels.length;i++) {
    originalLetters += pixels[i].textContent;
}

let currentLetter = 0;
let interval = setInterval(flipLetters, 100);

function flipLetters(n) {

    // set every letter to a random character, starting from the current letter
    for (j=currentLetter;j<pixels.length;j++) {
        randomChar = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        pixels[j].textContent = randomChar;
        pixels[j].style.color = 'red';
    }
    
    // but set the current letter back to its original
    pixels[currentLetter].textContent = originalLetters.charAt(currentLetter);
    pixels[currentLetter].style.color = 'Initial';

    // move on to the next letter
    currentLetter += 1;

    // if all the letters have been flipped and restored, then stop
    if (currentLetter == originalLetters.length) {
        clearInterval(interval);
    }
}
