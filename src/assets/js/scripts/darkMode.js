/* eslint-disable no-undef, func-names */
$(() => {
  const $themeSelector = $('#theme-selector');
  const $themeSelectorText = $('#theme-selector-text');
  const $body = $('body')[0];

  // Re-apply cached theme
  const theme = localStorage.getItem('theme');
  if (theme) {
    $body.classList.add(theme);
    $themeSelectorText.text(theme === 'dark' ? 'Esclarecer' : 'Oscurecer');
  } else {
    $body.classList.add('dark');
  }

  $themeSelector.on('click', (event) => {
    event.preventDefault();

    if ($body.classList.contains('dark')) {
      $body.classList.remove('dark');
      $body.classList.add('light');
      $themeSelectorText.text('Oscurecer');
      localStorage.setItem('theme', 'light');
    } else {
      $body.classList.remove('light');
      $body.classList.add('dark');
      $themeSelectorText.text('Esclarecer');
      localStorage.setItem('theme', 'dark');
    }
  });
});
