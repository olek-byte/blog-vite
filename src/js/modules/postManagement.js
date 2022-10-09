import {
  removePostRequest,
  updatePostRequest,
  createPostRequest,
  getPostsRequest,
} from '../../api/posts';

import { deleteModal } from './deleteModal';
import { modalModule } from './modalModule';
import { preloadModule } from './preloadModule';

preloadModule.togglePreloader();

export const postManagement = (() => {
  const postsList = document.querySelector('.posts__list');
  const postTitleInput = document.querySelector('.new-post__title');
  const postBodyInput = document.querySelector('.new-post__body');
  const createPostBtn = document.querySelector('.create-post-btn');
  const updatePostBtn = document.querySelector('.update-post-btn');
  const main = document.querySelector('.main');
  const agreeBtn = document.querySelector('.modal-delete__agree');
  const disAgreeBtn = document.querySelector('.modal-delete__disagree');
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

  const init = () => {
    const createPost = post => `
        <article class="blog-card">
            <div class="blog-card__inner">
                <img src="./img/post-img.jpg" alt="Post Image" class="blog-card__img">

                <div class="blog-card__content">
                    <span class="blog-card__title">${post.title}</span>
                    <p class="blog-card__descr">${post.body}</p>

                    <div class="blog-card__buttons-box">
                        <button class="blog-card__edit" data-id="${post.id}">Edit</button>
                        <button class="blog-card__delete" data-id="${post.id}">Delete</button>
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
      } else {
        main.innerHTML = '<p class="empty-post">There is nothing here...</p>';
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
      const editButtons = document.querySelectorAll('.blog-card__edit');
      editButtons.forEach(elem => {
        elem.addEventListener('click', e => {
          postId = Number(e.target.getAttribute('data-id'));
          if (!postId) {
            return;
          }
          modalModule.openModalWindowPost(false);
          editPost(postId);
        });
      });

      const deleteButtons = document.querySelectorAll('.blog-card__delete');
      deleteButtons.forEach(elem => {
        elem.addEventListener('click', e => {
          deleteModal.openDelModal();
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
      preloadModule.togglePreloader();
      deletePost(postId);
      deleteModal.closeDelModal();
      preloadModule.togglePreloader();
    });

    disAgreeBtn.addEventListener('click', () => {
      deleteModal.closeDelModal();
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

    const validate = () => {
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
      return true;
    };

    createPostBtn.addEventListener('click', async () => {
      if (validate()) {
        if (postTitleInput.value !== '' && postBodyInput.value !== '') {
          preloadModule.togglePreloader();
          const newPost = await createPostRequest(state.newPost);
          state.posts.push(newPost);
          modalModule.closeModalWindowPost();
          cleanData();
          preloadModule.togglePreloader();
        }
      } else {
        return;
      }
      fillPostsList(state.posts);
      updateEventListeners();
    });

    updatePostBtn.addEventListener('click', async () => {
      if (validate()) {
        if (postTitleInput.value !== '' && postBodyInput.value !== '') {
          preloadModule.togglePreloader();
          await updatePostRequest(state.editPost);
          modalModule.closeModalWindowPost();
          cleanData();
          preloadModule.togglePreloader();
        }
      } else {
        return;
      }
      fillPostsList(state.posts);
      updateEventListeners();
    });

    document.addEventListener('DOMContentLoaded', async () => {
      const getAllPosts = await getPostsRequest();
      state.posts.concat(getAllPosts);
      state.posts = state.posts.concat(getAllPosts);
      fillPostsList(state.posts);
      updateEventListeners();
    });
  };

  return {
    init,
  };
})();
