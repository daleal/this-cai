function toggleModal(modalId) {
  const $modal = document.getElementById(modalId);

  let active = false;

  $modal.childNodes.forEach(($child) => {
    if ($child.classList.contains('is-active')) {
      $child.classList.remove('is-active');
    } else {
      $child.classList.add('is-active');
      active = true;
    }
  });

  return active;
}


export default {
  toggleModal,
};
