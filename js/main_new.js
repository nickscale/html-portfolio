//* LETTER SORT ANIMATION

let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
let originalLetters = ''
let pixels = document.getElementsByClassName("pixel");

// save the original letters to be restored later
for (i=0;i<pixels.length;i++) {
    originalLetters += pixels[i].textContent;
}

let currentLetter = 0;
let interval = setInterval(flipLetters, 50); // speed in ms

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
    }
}


//* SAVE THEME SELECTION IN LOCAL STORAGE

const colorThemes = document.querySelectorAll('[name="theme"]');
let activeTheme = null;

// store selected theme
const storeTheme = function (theme) {
  console.log('SAVE theme:',activeTheme);
  localStorage.setItem("theme", theme);
};

// retrieve saved theme
function setTheme () {
  activeTheme = localStorage.getItem("theme");
  console.log('GET theme:',activeTheme);
  colorThemes.forEach((themeOption) => {
    if (themeOption.id === activeTheme) {
      themeOption.checked = true;
    }
  });
  // fallback for browsers without :has() support (i.e. Firefox)
  document.documentElement.className = activeTheme;
};

// check for clicks on theme picker
colorThemes.forEach((themeOption) => {
  themeOption.addEventListener("click", () => {
    storeTheme(themeOption.id);
    location.reload();
    console.log('PICK theme:',themeOption.id);
  });
});


//* REVEAL ELEMENTS WITH ANIMATION WHEN USER SCROLLS

function scrollReveal() {
  var elements = document.querySelectorAll(".scroll-reveal");

  for (i = 0; i < elements.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = elements[i].getBoundingClientRect().top;
    var elementVisible = 0; // distance from bottom when element appears

    if (elementTop < windowHeight - elementVisible) {
      elements[i].classList.add("active");
    } else {
      elements[i].classList.remove("active");
    }
  }
}

// listen for scrolling events and animate in selected elements  
window.addEventListener("scroll", scrollReveal);

// restore theme if one was previously saved
document.onload = setTheme();
