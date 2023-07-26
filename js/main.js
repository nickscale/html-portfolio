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

document.onload = setTheme();
