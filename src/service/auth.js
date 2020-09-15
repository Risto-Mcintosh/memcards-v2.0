import axios from 'axios';
import API from './urls';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export async function loginUser({ email, password }) {
  return axios.post(API.login, {
    email,
    password
  });
}

export async function logOutUser() {
  await axios.post(API.logout);
}

export async function registerUser({ email, userName, password }) {
  console.log('post');
  return axios.post(API.register, {
    email,
    userName,
    password
  });
}
