function formRequesterGenerator(formId) {
  function requestMethod(event) {
    event.preventDefault();
    const $logOutForm = document.getElementById(formId);
    $logOutForm.submit();
  }

  return requestMethod;
}

export default {
  formRequesterGenerator,
};
