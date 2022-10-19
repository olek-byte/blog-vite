import { postManagement } from './postManagement';
import { deleteModal } from './deleteModal';

export const modalModule = (() => {
  const addPostBtn = document.querySelector('.add-post-btn');
  const modalWindow = document.querySelector('.modal');
  const closeModalBtn = document.querySelector('.modal__close');
  const createPostBtn = document.querySelector('.modal__create-btn');
  const updatePostBtn = document.querySelector('.modal__update-btn');
  const postTitleInput = document.querySelector('.new-post__title');
  const postBodyInput = document.querySelector('.new-post__body');
  const VISIBLE_CLASS = 'visible';
  const CREATE_CLASS = 'modal__create';
  const ERROR_CLASS = 'error';

  const openModalWindowPost = isCreate => {
    modalWindow.classList.add(VISIBLE_CLASS);
    postTitleInput.classList.remove(ERROR_CLASS);
    postBodyInput.classList.remove(ERROR_CLASS);
    if (isCreate) {
      modalWindow.classList.add(CREATE_CLASS);
    }
  };

  const closeModalWindowPost = () => {
    modalWindow.classList.remove(VISIBLE_CLASS);
    modalWindow.classList.remove(CREATE_CLASS);
    postTitleInput.classList.remove(ERROR_CLASS);
    postBodyInput.classList.remove(ERROR_CLASS);
    postManagement.cleanData();
  };

  addPostBtn.addEventListener('click', e => {
    e.preventDefault();
    openModalWindowPost(true);
  });

  createPostBtn.addEventListener('click', e => {
    e.preventDefault();
  });

  updatePostBtn.addEventListener('click', e => {
    e.preventDefault();
  });

  document.onkeydown = e => {
    if (e.keyCode === 27) {
      closeModalWindowPost();
      deleteModal.closeDelModal();
    }
  };

  closeModalBtn.addEventListener('click', e => {
    e.preventDefault();
    closeModalWindowPost();
  });

  return {
    openModalWindowPost,
    closeModalWindowPost,
  };
})();
