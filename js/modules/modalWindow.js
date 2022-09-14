export const modalWindow = (() => {
    const btnOpen = document.querySelector('.btn-modal');
    const btnClose = document.querySelector('.modal__close');
    const overlay = document.querySelector('.overlay');
    const modal = document.querySelector('.modal');

    let openModalWIndow = () => {
        overlay.style.visibility = 'visible';
        overlay.style.opacity = '1';
        modal.style.visibility = 'visible';
        modal.style.opacity = '1';
    }

    let closeModalWIndow = () => {
        overlay.style.visibility = 'hidden';
        overlay.style.opacity = '0';
        modal.style.visibility = 'hidden';
        modal.style.opacity = '0';
    }

    let overlayClick = () => {
        overlay.style.visibility = 'hidden';
        overlay.style.opacity = '0';
        modal.style.visibility = 'hidden';
        modal.style.opacity = '0';
    }

    function eventHandler() {
       btnOpen.addEventListener('click', openModalWIndow);
       btnClose.addEventListener('click', closeModalWIndow);
       overlay.addEventListener('click', overlayClick);
    }

    const init = () => {
        eventHandler();
    }

    return {
        init,
    }
})();