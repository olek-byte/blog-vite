// eslint-disable-next-line import/prefer-default-export
const requestURL = 'https://jsonplaceholder.typicode.com';

export const removePostRequest = id =>
  fetch(`${requestURL}/posts/${id}`, {
    method: 'DELETE',
  });

export const updatePostRequest = params =>
  fetch(`${requestURL}/posts/${params.id}`, {
    method: 'PATCH',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then(res => res.json());

export const createPostRequest = params =>
  fetch(`${requestURL}/posts`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then(res => res.json());

export const getPostsRequest = () =>
  fetch(`${requestURL}/posts?_limit=10`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then(res => res.json());
