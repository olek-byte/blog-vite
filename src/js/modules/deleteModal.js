export const deleteModal = (() => {
  const delModal = document.querySelector('.modal-delete');
  const VISIBLE_CLASS = 'visible';

  const openDelModal = () => {
    delModal.classList.add(VISIBLE_CLASS);
  };

  const closeDelModal = () => {
    delModal.classList.remove(VISIBLE_CLASS);
  };

  openDelModal();
  closeDelModal();

  return {
    openDelModal,
    closeDelModal,
  };
})();
