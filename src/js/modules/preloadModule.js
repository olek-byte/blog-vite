export const preloadModule = (() => {
  const preloader = document.querySelector('.preloader');
  const HIDE_CLASS = 'hidden';
  const DELAY = 300;

  const togglePreloader = () => {
    setTimeout(() => {
      preloader.classList.toggle(HIDE_CLASS);
    }, DELAY);
  };

  return {
    togglePreloader,
  };
})();
