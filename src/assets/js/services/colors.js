function switchColor() {
  const $html = document.getElementsByTagName('html')[0];

  if ($html.classList.contains('dark')) {
    $html.classList.remove('dark');
    $html.classList.add('light');
    localStorage.setItem('theme', 'light');
  } else {
    $html.classList.remove('light');
    $html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
}

function getButtonText() {
  const $html = document.getElementsByTagName('html')[0];
  return $html.classList.contains('dark') ? 'Esclarecer' : 'Oscurecer';
}

export default {
  switchColor,
  getButtonText,
};
