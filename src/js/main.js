import { modalModule } from './modules/modalModule';
import {
  removePostRequest,
  updatePostRequest,
  createPostRequest,
  getPostsRequest,
} from './api/posts';

modalModule.init();

const postsList = document.querySelector('.posts__list');

const postTitleInput = document.querySelector('.new-post__title');
const postBodyInput = document.querySelector('.new-post__body');

const createPostBtn = document.querySelector('.create-post-btn');
const updatePostBtn = document.querySelector('.update-post-btn');

const main = document.querySelector('.main');
const agreeBtn = document.querySelector('.modal-delete__agree');
const disAgreeBtn = document.querySelector('.modal-delete__disagree');

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

const editPost = postId => {
  const selectedPost = state.posts.filter(
    currentPost => currentPost.id === postId
  );
  state.editPost = Object.assign(selectedPost[0], state.editPost);
  postTitleInput.value = selectedPost[0].title;
  postBodyInput.value = selectedPost[0].body;
};

// const removePostRequest = id =>
//   fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
//     method: 'DELETE',
//   });

const updateEventListeners = () => {
  const editBtns = document.querySelectorAll('.buttons__edit');
  editBtns.forEach(elem => {
    elem.addEventListener('click', e => {
      const postId = Number(e.target.getAttribute('data-id'));
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
      agreeBtn.addEventListener('click', () => {
        const postId = Number(e.target.getAttribute('data-id'));
        deletePost(postId);
        modalModule.closeDelModal();
      });
      disAgreeBtn.addEventListener('click', () => {
        const postId = Number(e.target.removeAttribute('data-id'));
        modalModule.closeDelModal(postId);
      });
    });
  });
};

// const deletePost = postId => {
//   const selectedPost = state.posts.findIndex(
//     currentPost => currentPost.id === postId
//   );

//   state.posts.splice(selectedPost, 1);
//   removePostRequest(selectedPost);

//   fillPostsList(state.posts);
//   updateEventListeners();
// };

const deletePost = postId => {
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

// const createPostRequest = () =>
//   fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: 'POST',
//     body: JSON.stringify(state.newPost),
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//   })
//     .then(res => res.json())
//     .then(post => state.posts.push(post));

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
    const newPost = await createPostRequest(state.newPost);
    state.posts.push(newPost);
    modalModule.closeModalWindowPost();
    cleanData();
  }

  fillPostsList(state.posts);
  updateEventListeners();
});

// const updatePostRequest = () =>
//   fetch(`https://jsonplaceholder.typicode.com/posts/${state.editPost.id}`, {
//     method: 'PATCH',
//     body: JSON.stringify(state.editPost),
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//   })
//     .then(res => res.json())
//     .then(data => data);

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
    const updatePost = await updatePostRequest(state.editPost);
    modalModule.closeModalWindowPost();
    cleanData();
  }

  fillPostsList(state.posts);
  updateEventListeners();
  cleanData();
});

// const getPostsRequest = () =>
//   fetch('https://jsonplaceholder.typicode.com/posts?_limit=4', {
//     method: 'GET',
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//   })
//     .then(res => res.json())
//     .then(posts => {
//       state.posts = state.posts.concat(posts);
//     });

document.addEventListener('DOMContentLoaded', async () => {
  const getAllPosts = await getPostsRequest();
  state.posts.concat(getAllPosts);
  state.posts = state.posts.concat(getAllPosts);
  fillPostsList(state.posts);
  updateEventListeners();
});
