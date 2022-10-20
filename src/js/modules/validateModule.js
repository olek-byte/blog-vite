export const validateModule = (() => {
  const postTitleInput = document.querySelector('.new-post__title');
  const postBodyInput = document.querySelector('.new-post__body');
  const ERROR_CLASS = 'error';
  const ERROR_MESSAGE = 'The field is empty';

  const validate = () => {
    const errors = [];

    if (postTitleInput.value === '') {
      postTitleInput.classList.add(ERROR_CLASS);
      errors.push(ERROR_MESSAGE);
    } else {
      postTitleInput.classList.remove(ERROR_CLASS);
    }

    if (postBodyInput.value === '') {
      postBodyInput.classList.add(ERROR_CLASS);
      errors.push(ERROR_MESSAGE);
    } else {
      postBodyInput.classList.remove(ERROR_CLASS);
    }
    return !errors.length;
  };

  return {
    validate,
  };
})();
