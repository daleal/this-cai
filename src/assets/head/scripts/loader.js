/* eslint-disable no-undef, func-names */

// Get HTML element tag
const $html = $('html')[0];

// Re-apply cached theme
const theme = localStorage.getItem('theme');
if (theme) {
  $html.classList.add(theme);
} else {
  $html.classList.add('dark');
}

$(() => {
  const $themeSelectorText = $('#theme-selector-text');

  // Remove the loading class
  $html.classList.remove('is-loading');

  // Re-define text
  $themeSelectorText.text(
    $html.classList.contains('dark') ? 'Esclarecer' : 'Oscurecer',
  );
});
