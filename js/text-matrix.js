let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
let originalLetters = ''
let pixels = document.getElementsByClassName("pixel");

// save the original letters to be restored later
for (i=0;i<pixels.length;i++) {
    originalLetters += pixels[i].textContent;
}

let currentLetter = 0;
let interval = setInterval(flipLetters, 75);
let thisFlippingSound = new Audio("audio/split-flap-display.mp3");
thisFlippingSound.volume = 0.15;
thisFlippingSound.play();

function flipLetters(n) {

    // set every letter to a random character, starting from the current letter
    for (j=currentLetter;j<pixels.length;j++) {
        randomChar = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        pixels[j].textContent = randomChar;
        pixels[j].classList.add("pixel-colour");
    }
    
    // but set the current letter back to its original
    pixels[currentLetter].textContent = originalLetters.charAt(currentLetter);
    pixels[currentLetter].classList.remove("pixel-colour");

    // move on to the next letter
    currentLetter += 1;

    // if all the letters have been flipped and restored, then stop
    if (currentLetter == originalLetters.length) {
        clearInterval(interval);
        thisFlippingSound.pause();
    }
}
