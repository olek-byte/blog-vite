// eslint-disable-next-line import/prefer-default-export
export const modalModule = (() => {
  const addPostBtn = document.querySelector('.add-post-btn');
  const modalWindow = document.querySelector('.modal');
  const modalInner = document.querySelector('.modal__inner');
  const preloader = document.querySelector('.preloader');
  const closeModalBtn = document.querySelector('.modal__close');
  const createPostBtn = document.querySelector('.create-post-btn');
  const updatePostBtn = document.querySelector('.update-post-btn');

  const eventHandler = () => {
    // Modal opening
    addPostBtn.addEventListener('click', e => {
      e.preventDefault();
      const openModalWIndow = () => {
        modalWindow.classList.add('visible');
        modalInner.classList.add('visible');
      };
      updatePostBtn.classList.add('display-none');
      createPostBtn.classList.add('display-inline-block');
      openModalWIndow();
    });

    createPostBtn.addEventListener('click', e => {
      e.preventDefault();
    });

    updatePostBtn.addEventListener('click', e => {
      e.preventDefault();
    });

    // PRELOADER
    window.onload = () => {
      preloader.classList.add('display-none');
    };

    // Modal window Close Esc
    document.onkeydown = e => {
      if (e.keyCode === 27) {
        modalWindow.classList.add('hidden');
      }
    };

    // Modal window Close Btn
    closeModalBtn.addEventListener('click', e => {
      e.preventDefault();

      const closeModalWIndow = () => {
        modalWindow.classList.add('hidden');
        modalInner.classList.add('hidden');
      };
      return closeModalWIndow();
    });
  };

  const init = () => {
    eventHandler();
  };

  return {
    init,
  };
})();
