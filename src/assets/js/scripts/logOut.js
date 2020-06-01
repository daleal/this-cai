/* eslint-disable no-undef, func-names */
$(() => {
  $('#log-out-anchor').on('click', (event) => {
    event.preventDefault();
    $('#log-out-form').submit();
  });
});
