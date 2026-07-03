(function () {
  function applyTheme() {
    const theme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  }
  applyTheme();
  document.addEventListener('astro:after-swap', applyTheme);
})();
