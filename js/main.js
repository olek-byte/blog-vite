import {
    modalModule
} from './modules/modalModule.js';
modalModule.init();

const modalWindow = document.querySelector('.modal');
const modalInner = document.querySelector('.modal__inner');
const postsList = document.querySelector('.posts__list');

const postTitleInput = document.querySelector('.new-post__title');
const postBodyInput = document.querySelector('.new-post__body');
const createPostBtn = document.querySelector('.create-post-btn');
const updatePostBtn = document.querySelector('.update-post-btn');

const state = {
    posts: [],
    newPost: {
        title: '',
        body: ''
    },
    editPost: {}
}

const cleanData = () => {
    state.newPost.title = '';
    state.newPost.body = '';

    postTitleInput.value = '';
    postBodyInput.value = '';

    state.editPost = {};
}

const editPost = (postId) => {
    const selectedPost = state.posts.filter((currentPost) => currentPost.id === postId);
    console.log(selectedPost);
    state.editPost = Object.assign(selectedPost[0], state.editPost);
    console.log(state.editPost);
    postTitleInput.value = selectedPost[0].title;
    postBodyInput.value = selectedPost[0].body;

    const openModalWindow = () => {
        modalWindow.style.visibility = 'visible';
        modalInner.style.opacity = '1';
    }
    createPostBtn.style.display = 'none';
    updatePostBtn.style.display = 'inline-block';
    return openModalWindow();
}

const deletePost = (postId) => {
    const selectedPost = state.posts.filter((currentPost) => currentPost.id === postId);
    state.editPost = selectedPost[0];
    console.log(state.editPost.id);
    removePostRequest(state.editPost.id);
    state.posts.splice(state.editPost.id, 1);
    fillPostsList(state.posts);
}

const createPost = (post) => `
    <article class="blog-card post">
        <div class="blog-card__inner post__wrapper">
            <img src="https://st2.depositphotos.com/1471096/7466/i/600/depositphotos_74661735-stock-photo-angry-wolf-head.jpg" alt="blog-image" class="blog-card__img">
            <div class="blog-card__content">
                <span class="blog-card__title">${post.title}</span>
                <p class="blog-card__descr">${post.body}</p> 

                <div class="post__buttons">
                    <button class="buttons__edit" data-id="${post.id}">Edit</button>  
                    <button class="buttons__delete" data-id="${post.id}">Delete</button> 
                </div> 
            </div> 

        </div>  
    </article>
`;

const fillPostsList = (posts) => {
    const main = document.querySelector('.main');
    postsList.innerHTML = "";
    if (posts.length) {
        posts.forEach((post, index) => postsList.innerHTML += createPost(post, index));
    } else if (posts.length == 0) {
        main.innerHTML = '<p class="center">There is nothing here...</p>'
    }
}

postTitleInput.addEventListener('change', (e) => {
    if (!!state.editPost.title) {
        if (postTitleInput.value !== '') {
            return state.editPost.title = e.target.value;
        }
    }
    return state.newPost.title = e.target.value;
});

postBodyInput.addEventListener('change', (e) => {
    if (!!state.editPost.body) {
        if (postBodyInput.value !== '') {
            return state.editPost.body = e.target.value;
        }
    }
    return state.newPost.body = e.target.value;
});

updatePostBtn.addEventListener('click', async () => {
    console.log("update-btn clicking");

    if (postTitleInput.value === '') {
        postTitleInput.classList.add('error');
    }

    if (postBodyInput.value === '') {
        postBodyInput.classList.add('error');
    }

    if (postTitleInput.value !== '') {
        postTitleInput.classList.remove('error');
    }

    if (postBodyInput.value !== '') {
        postBodyInput.classList.remove('error');
    }

    if (postTitleInput.value !== '' && postBodyInput.value !== '') {
        modalWindow.style.visibility = 'hidden';
        await updatePostRequest();

        cleanData();

    }
    fillPostsList(state.posts);


})

createPostBtn.addEventListener('click', async () => {
    if (postTitleInput.value === '') {
        postTitleInput.classList.add('error');
    }

    if (postBodyInput.value === '') {
        postBodyInput.classList.add('error');
    }

    if (postTitleInput.value !== '') {
        postTitleInput.classList.remove('error');
    }

    if (postBodyInput.value !== '') {
        postBodyInput.classList.remove('error');
    }

    if (postTitleInput.value !== '' && postBodyInput.value !== '') {
        modalWindow.style.visibility = 'hidden';
        await createPostRequest();
        cleanData();
    }
    fillPostsList(state.posts);
})

document.addEventListener('DOMContentLoaded', async () => {
    await getPostsRequest();
    fillPostsList(state.posts);

    const editBtns = document.querySelectorAll('.buttons__edit');
    editBtns.forEach(elem => {
        elem.addEventListener('click', (e) => {
            const postId = Number(e.target.getAttribute('data-id'));
            if (!postId) {
                return;
            }
            editPost(postId);
        })
    })

    const deleteBtns = document.querySelectorAll('.buttons__delete');
    const delModal = document.querySelector('.modal-delete');

    deleteBtns.forEach(elem => {
        elem.addEventListener('click', (e) => {
            console.log('Hello world!!!');
            delModal.style.visibility = 'visible';

            const postId = Number(e.target.getAttribute('data-id'));
            const agreeBtn = document.querySelector('.modal-delete__agree');
            const disAgreeBtn = document.querySelector('.modal-delete__disagree');

            agreeBtn.addEventListener('click', () => {
                console.log('Yes');
                deletePost(postId);
                delModal.style.visibility = 'hidden';
            })

            disAgreeBtn.addEventListener('click', () => {
                console.log('No');
                delModal.style.visibility = 'hidden';
            })
        })
    })
})

const getPostsRequest = () => {
    return fetch('https://jsonplaceholder.typicode.com/posts?_limit=4', {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((res) => res.json())
        .then((posts) => state.posts = state.posts.concat(posts))
}

const createPostRequest = () => {
    return fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(state.newPost),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((res) => res.json())
        .then((post) => state.posts.push(post))
}

const updatePostRequest = () => {
    // console.log(state.editPost);
    // return;
    return fetch(`https://jsonplaceholder.typicode.com/posts/${state.editPost.id}`, {
            method: 'PATCH',
            body: JSON.stringify(state.editPost),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((res) => res.json())
        .then((data) => data)
}

const removePostRequest = (id) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
    })
}