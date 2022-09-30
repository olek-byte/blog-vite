// eslint-disable-next-line import/prefer-default-export
export const preloadModule = (() => {
  const preloader = document.querySelector('.preloader');
  const DELAY = 300;

  const preloaderTime = () => {
    setTimeout(() => {
      preloader.classList.remove('display-flex');
      preloader.classList.add('display-none');
    }, DELAY);
  };

  const init = () => {
    preloaderTime();
  };

  return {
    init,
    preloaderTime,
  };
})();
