document.addEventListener('DOMContentLoaded', function () {
  const themeToggleButton = document.getElementById('theme-toggle')
  const iconLight = document.getElementById('theme-icon-moon')
  const iconDark = document.getElementById('theme-icon-sun')
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'

  function applyTheme(theme) {
    if (theme === systemTheme) {
      localStorage.setItem('theme', 'system')
    } else {
      localStorage.setItem('theme', theme)
    }

    if (theme === 'system') {
      theme = systemTheme
    }

    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.style.colorScheme = 'dark'
      iconLight.classList.remove('hidden')
      iconDark.classList.add('hidden')
      themeToggleButton.setAttribute('aria-label', 'Switch to light theme')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.style.colorScheme = 'light'
      iconLight.classList.add('hidden')
      iconDark.classList.remove('hidden')
      themeToggleButton.setAttribute('aria-label', 'Switch to dark theme')
    }
  }

  function initTheme() {
    const storedTheme = localStorage.getItem('theme') || 'system'
    applyTheme(storedTheme)
  }

  function toggleTheme() {
    let currentTheme = localStorage.getItem('theme')
    if (currentTheme === 'system') {
      currentTheme = systemTheme
    }

    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    applyTheme(newTheme)
  }

  themeToggleButton.addEventListener('click', toggleTheme)

  initTheme()
})
