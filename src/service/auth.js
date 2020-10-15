import API from './urls';
import client from '../utils/api-client';

const localStorageKey = '__memcards-app__';

function handleUserResponse({ userId }) {
  console.log('logging in ??');
  window.localStorage.setItem(localStorageKey, userId);
  return userId;
}

async function getToken() {
  return window.localStorage.getItem(localStorageKey);
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

export { login, logout, register, getToken, localStorageKey };
