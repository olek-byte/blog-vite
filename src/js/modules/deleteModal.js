export const deleteModal = (() => {
  const delModal = document.querySelector('.modal-delete');

  const openDelModal = () => {
    delModal.classList.add('visible');
  };

  const closeDelModal = () => {
    delModal.classList.remove('visible');
  };

  const init = () => {
    openDelModal();
    closeDelModal();
  };

  return {
    init,
    openDelModal,
    closeDelModal,
  };
})();
