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

//PUT
const editPost = (index) => {
    const editeblePost = state.posts[index];
    state.editPost = editeblePost;

    postTitleInput.value = state.editPost.title;
    postBodyInput.value = state.editPost.body;

    console.log('HELLLO');

    const openModalWIndow = () => {
        modalWindow.style.visibility = 'visible';
        modalInner.style.opacity = '1';
    }
    // modalWindow.style.visibility = 'visible';
    // modalInner.style.opacity = '1';
    createPostBtn.style.display = 'none';
    updatePostBtn.style.display = 'inline-block';
    return openModalWIndow();
}


const deletePost = (index) => {
    const editeblePost = state.posts[index];
    removePostRequest(editeblePost.id);
    state.posts.splice(index, 1);
    fillPostsList(state.posts);
}



const createPost = (post, index) => `
    <article class="blog-card post">
        <div class="blog-card__inner post__wrapper">
            <img src="https://st2.depositphotos.com/1471096/7466/i/600/depositphotos_74661735-stock-photo-angry-wolf-head.jpg" alt="blog-image" class="blog-card__img">
            <div class="blog-card__content">
                <span class="blog-card__title">${post.title}</span>
                <p class="blog-card__descr">${post.body}</p> 

                <div class="post__buttons">
                    <button class="buttons__edit" onclick="editPost(${index})">Edit</button>  
                    <button class="buttons__delete" onclick="deletePost(${index})">Delete</button> 
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
            postTitleInput.classList.remove('error');
            return state.editPost.title = e.target.value;
        } else {
            postTitleInput.classList.add('error');
        }
    }
    return state.newPost.title = e.target.value;
});

postBodyInput.addEventListener('change', (e) => {
    if (!!state.editPost.title) {
        if (postBodyInput.value !== '') {
            postBodyInput.classList.remove('error');
            return state.editPost.body = e.target.value;
        } else {
            postBodyInput.classList.add('error');
        }
    }
    return state.newPost.body = e.target.value;
});

updatePostBtn.addEventListener('click', async () => {
    console.log("jjjj");
    if (!!state.editPost.title || !!state.editPost.body) {
        if (postTitleInput.value !== '' && postBodyInput.value !== '') {
            await updatePostRequest();
            // cleanData();
            fillPostsList(state.posts);
            modalWindow.style.visibility = 'hidden';
        }
    }
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
    return fetch(`https://jsonplaceholder.typicode.com/posts/${state.editPost.id}`, {
            method: 'PUT',
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