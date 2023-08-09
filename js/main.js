// SAVE THEME SELECTION IN LOCAL STORAGE
const colorThemes = document.querySelectorAll('[name="theme"]');

// store selected theme
const storeTheme = function (theme) {
  localStorage.setItem("theme", theme);
};

// retrieve saved theme
const setTheme = function () {
  const activeTheme = localStorage.getItem("theme");
  console.log('Load theme:',activeTheme);
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
    console.log('Set theme:',themeOption.id);
  });
});


// FOR SCROLL REVEAL ANIMATIONS
function scrollReveal() {
  var elements = document.querySelectorAll(".scroll-reveal");

  for (i = 0; i < elements.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = elements[i].getBoundingClientRect().top;
    var elementVisible = 10; // distance from bottom when element appears

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
