import axios from 'axios';
import API from './urls';
import client from '../utils/api-client';

// TODO update these functions to use api-client
async function login({ email, password }) {
  return axios.post(API.login, {
    email,
    password
  });
}

async function logOut() {
  await axios.post(API.logout);
}

async function register({ email, userName, password }) {
  console.log('post');
  return axios.post(API.register, {
    email,
    userName,
    password
  });
}

export { login, logOut, register };
