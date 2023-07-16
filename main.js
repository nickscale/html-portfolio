const colorThemes = document.querySelectorAll('[name="theme"]');

// store the chosen theme
const storeTheme = function (theme) {
  localStorage.setItem("theme", theme);
};

// retrieve and set the theme
const setTheme = function (theme) {
  const activeTheme = localStorage.getItem("theme");
  console.log(activeTheme);
  colorThemes.forEach((themeOption) => {
    if (themeOption.id === activeTheme) {
      themeOption.checked = true;
    }
  });
  // fallback for browsers without :has() support
  document.documentElement.className = theme;
};

// check for clicks on theme picker
colorThemes.forEach((themeOption) => {
  themeOption.addEventListener("click", () => {
    storeTheme(themeOption.id);
  });
});

document.onload = setTheme();
