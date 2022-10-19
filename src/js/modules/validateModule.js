export const validateModule = (() => {
  const postTitleInput = document.querySelector('.new-post__title');
  const postBodyInput = document.querySelector('.new-post__body');
  const ERROR_CLASS = 'error';

  const validate = () => {
    if (postTitleInput.value === '' && postBodyInput.value === '') {
      postTitleInput.classList.add(ERROR_CLASS);
      postBodyInput.classList.add(ERROR_CLASS);
      return false;
    }
    if (postTitleInput.value !== '') {
      postTitleInput.classList.remove(ERROR_CLASS);
    } else {
      postTitleInput.classList.add(ERROR_CLASS);
      return false;
    }
    if (postBodyInput.value !== '') {
      postBodyInput.classList.remove(ERROR_CLASS);
    } else {
      postBodyInput.classList.add(ERROR_CLASS);
      return false;
    }
    return true;
  };

  return {
    validate,
  };
})();
