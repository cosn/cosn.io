document.addEventListener('DOMContentLoaded', function () {
  const themeToggleButton = document.getElementById('theme-toggle');
  const iconLight = document.getElementById('theme-icon-moon');
  const iconDark = document.getElementById('theme-icon-sun');

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      iconLight.classList.remove('hidden');
      iconDark.classList.add('hidden');
      themeToggleButton.setAttribute('aria-label', 'Switch to light theme');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      iconLight.classList.add('hidden');
      iconDark.classList.remove('hidden');
      themeToggleButton.setAttribute('aria-label', 'Switch to dark theme');
    } else { // system theme
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', systemPrefersDark);
      if (systemPrefersDark) {
        iconLight.classList.remove('hidden');
        iconDark.classList.add('hidden');
        themeToggleButton.setAttribute('aria-label', 'Switch to light theme');
      } else {
        iconLight.classList.add('hidden');
        iconDark.classList.remove('hidden');
        themeToggleButton.setAttribute('aria-label', 'Switch to dark theme');
      }
    }
    localStorage.setItem('theme', theme);
  }

  function initTheme() {
    const storedTheme = localStorage.getItem('theme') || 'system';
    applyTheme(storedTheme);
  }

  function toggleTheme() {
    const currentTheme = localStorage.getItem('theme');
    const newTheme = currentTheme === 'dark' ? 'light' : (currentTheme === 'light' ? 'system' : 'dark');
    applyTheme(newTheme);
  }

  themeToggleButton.addEventListener('click', toggleTheme);

  initTheme();
});
