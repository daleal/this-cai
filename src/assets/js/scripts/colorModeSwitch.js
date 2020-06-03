/* eslint-disable no-undef, func-names */

$(() => {
  const $html = $('html')[0];
  const $themeSelector = $('#theme-selector');
  const $themeSelectorText = $('#theme-selector-text');

  $themeSelector.on('click', (event) => {
    event.preventDefault();

    if ($html.classList.contains('dark')) {
      $html.classList.remove('dark');
      $html.classList.add('light');
      $themeSelectorText.text('Oscurecer');
      localStorage.setItem('theme', 'light');
    } else {
      $html.classList.remove('light');
      $html.classList.add('dark');
      $themeSelectorText.text('Esclarecer');
      localStorage.setItem('theme', 'dark');
    }
  });
});
