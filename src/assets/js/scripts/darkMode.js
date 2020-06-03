/* eslint-disable no-undef, func-names */

// Re-apply cached theme
const theme = localStorage.getItem('theme');
if (theme) {
  $('body')[0].classList.add(theme);
} else {
  $('body')[0].classList.add('dark');
}

$(() => {
  const $body = $('body')[0];
  const $themeSelector = $('#theme-selector');
  const $themeSelectorText = $('#theme-selector-text');

  // Remove the loading class
  $body.classList.remove('is-loading');

  // Re-define text
  $themeSelectorText.text(
    $body.classList.contains('dark') ? 'Esclarecer' : 'Oscurecer',
  );

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
