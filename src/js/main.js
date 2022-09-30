import { modalModule } from './modules/modalModule';
import { preloadModule } from './modules/preloadModule';

import {
  removePostRequest,
  updatePostRequest,
  createPostRequest,
  getPostsRequest,
} from './api/posts';

modalModule.init();
preloadModule.init();

const postsList = document.querySelector('.posts__list');
const postTitleInput = document.querySelector('.new-post__title');
const postBodyInput = document.querySelector('.new-post__body');
const createPostBtn = document.querySelector('.create-post-btn');
const updatePostBtn = document.querySelector('.update-post-btn');
const main = document.querySelector('.main');
const agreeBtn = document.querySelector('.modal-delete__agree');
const disAgreeBtn = document.querySelector('.modal-delete__disagree');
const preloader = document.querySelector('.preloader');
let postId = null;

const state = {
  posts: [],
  newPost: {
    title: '',
    body: '',
  },
  editPost: {},
};

const cleanData = () => {
  state.newPost.title = '';
  state.newPost.body = '';
  postTitleInput.value = '';
  postBodyInput.value = '';
  state.editPost = {};
};

const createPost = post => `
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

const fillPostsList = posts => {
  postsList.innerHTML = '';
  if (posts.length) {
    posts.forEach((post, index) => {
      postsList.innerHTML += createPost(post, index);
    });
  } else if (posts.length === 0) {
    main.innerHTML = '<p class="center">There is nothing here...</p>';
  }
};

const editPost = () => {
  const selectedPost = state.posts.filter(
    currentPost => currentPost.id === postId
  );
  state.editPost = Object.assign(selectedPost[0], state.editPost);
  postTitleInput.value = selectedPost[0].title;
  postBodyInput.value = selectedPost[0].body;
};

const updateEventListeners = () => {
  const editBtns = document.querySelectorAll('.buttons__edit');
  editBtns.forEach(elem => {
    elem.addEventListener('click', e => {
      postId = Number(e.target.getAttribute('data-id'));
      if (!postId) {
        return;
      }
      modalModule.openModalWindowPost(false);
      editPost(postId);
    });
  });

  const deleteBtns = document.querySelectorAll('.buttons__delete');
  deleteBtns.forEach(elem => {
    elem.addEventListener('click', e => {
      modalModule.openDelModal();
      postId = Number(e.target.getAttribute('data-id'));
    });
  });
};

const deletePost = () => {
  const currentPostIndex = state.posts.findIndex(
    currentPost => currentPost.id === postId
  );
  if (currentPostIndex === -1) {
    return;
  }
  state.posts.splice(currentPostIndex, 1);
  removePostRequest(currentPostIndex);
  fillPostsList(state.posts);
  updateEventListeners();
};

agreeBtn.addEventListener('click', () => {
  preloader.classList.add('display-flex');
  deletePost(postId);
  modalModule.closeDelModal();
  preloadModule.preloaderTime();
});

disAgreeBtn.addEventListener('click', () => {
  modalModule.closeDelModal();
  postId = null;
});

postTitleInput.addEventListener('change', e => {
  if (postTitleInput.value !== '') {
    state.editPost.title = e.target.value;
  }
  state.newPost.title = e.target.value;
});

postBodyInput.addEventListener('change', e => {
  if (postBodyInput.value !== '') {
    state.editPost.body = e.target.value;
  }
  state.newPost.body = e.target.value;
});

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
    preloader.classList.add('display-flex');
    const newPost = await createPostRequest(state.newPost);
    state.posts.push(newPost);
    modalModule.closeModalWindowPost();
    cleanData();
    preloadModule.preloaderTime();
  }
  fillPostsList(state.posts);
  updateEventListeners();
});

updatePostBtn.addEventListener('click', async () => {
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
    preloader.classList.add('display-flex');
    await updatePostRequest(state.editPost);
    modalModule.closeModalWindowPost();
    cleanData();
    preloadModule.preloaderTime();
  }
  fillPostsList(state.posts);
  updateEventListeners();
  cleanData();
});

document.addEventListener('DOMContentLoaded', async () => {
  const getAllPosts = await getPostsRequest();
  state.posts.concat(getAllPosts);
  state.posts = state.posts.concat(getAllPosts);
  fillPostsList(state.posts);
  updateEventListeners();
  preloadModule.preloaderTime();
});
