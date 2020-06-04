/* eslint-disable no-undef, func-names */
$(() => {
  const logOutAnchor = $('#log-out-anchor');
  const logOutForm = $('#log-out-form');

  logOutAnchor.on('click', (event) => {
    event.preventDefault();
    logOutForm.submit();
  });
});
