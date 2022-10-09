export const preloadModule = (() => {
  const preloader = document.querySelector('.preloader');
  const DELAY = 300;

  const togglePreloader = () => {
    setTimeout(() => {
      preloader.classList.toggle('hidden');
    }, DELAY);
  };

  return {
    togglePreloader,
  };
})();
