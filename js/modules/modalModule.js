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
        addPostBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const openModalWIndow = () => {
                modalWindow.style.visibility = 'visible';
                modalInner.style.opacity = '1';
            }
            updatePostBtn.style.display = 'none';
            createPostBtn.style.display = 'inline-block';
            return openModalWIndow();
        })

        createPostBtn.addEventListener('click', (e) => {
            e.preventDefault();
        })

        //PRELOADER
        window.onload = () => {
            preloader.style.display = 'none';
        }

        //Modal window Close Esc 
        document.onkeydown = (e) => {
            if (e.keyCode === 27) {
                modalWindow.style.visibility = 'hidden';
            }
        }

        ////Modal window Close Btn
        closeModalBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const closeModalWIndow = () => {
                modalWindow.style.visibility = 'hidden';
                modalInner.style.opacity = '0';
            }
            return closeModalWIndow();
        })
    }

    const init = () => {
        eventHandler();
    }

    return {
        init,
    }
})();