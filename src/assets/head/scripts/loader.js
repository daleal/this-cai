/* eslint-disable no-undef, func-names */

// Get HTML element tag
const $html = document.getElementsByTagName('html')[0];

// Re-apply cached theme
const theme = localStorage.getItem('theme');
if (theme) {
  $html.classList.add(theme);
} else {
  $html.classList.add('dark');
}

document.addEventListener('DOMContentLoaded', () => {
  // Remove the loading class
  $html.classList.remove('is-loading');
});
