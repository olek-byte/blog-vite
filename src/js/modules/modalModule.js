export const modalModule = (() => {
  const addPostBtn = document.querySelector('.add-post-btn');
  const modalWindow = document.querySelector('.modal');
  const closeModalBtn = document.querySelector('.modal__close');
  const createPostBtn = document.querySelector('.create-post-btn');
  const updatePostBtn = document.querySelector('.update-post-btn');
  const postTitleInput = document.querySelector('.new-post__title');
  const postBodyInput = document.querySelector('.new-post__body');

  const openModalWindowPost = isCreate => {
    modalWindow.classList.add('visible');
    if (isCreate) {
      modalWindow.classList.add('create');
    }
  };

  const closeModalWindowPost = () => {
    modalWindow.classList.remove('visible');
    modalWindow.classList.remove('create');
    postTitleInput.classList.remove('error');
    postBodyInput.classList.remove('error');
  };

  const init = () => {
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
      }
    };

    closeModalBtn.addEventListener('click', e => {
      e.preventDefault();
      closeModalWindowPost();
    });
  };

  return {
    init,
    openModalWindowPost,
    closeModalWindowPost,
  };
})();
