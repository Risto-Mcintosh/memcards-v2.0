import API from './urls';
import axios from 'axios';
// import client from '../utils/api-client';

const localStorageKey = '__memcards-app__';

function handleUserResponse(user) {
  console.log('logging in ??');
  window.localStorage.setItem(localStorageKey, JSON.stringify(user));
  return user;
}

async function getToken() {
  return JSON.parse(window.localStorage.getItem(localStorageKey));
}

function login({ email, password }) {
  return client(API.login, {
    data: {
      email,
      password
    }
  }).then(handleUserResponse);
}

async function logout() {
  client(API.logout, { method: 'delete' });
  window.localStorage.removeItem(localStorageKey);
}

function register({ email, userName, password }) {
  return client(API.register, {
    data: { email, userName, password }
  }).then(handleUserResponse);
}

async function client(url, { data, ...config } = {}) {
  try {
    const response = await axios({
      url,
      method: data ? 'post' : 'get',
      data: data,
      headers: {
        'Content-Type': 'application/json'
      },
      ...config
    });

    return response.data;
  } catch (error) {
    console.log({ error });
    if (error.response.statusText === 'Unauthorized') {
      window.localStorage.removeItem(localStorageKey);
    }
    return Promise.reject(error.response);
  }
}

export { login, logout, register, getToken, localStorageKey };
