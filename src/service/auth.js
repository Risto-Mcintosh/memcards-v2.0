import API from './urls';
import client from '../utils/api-client';

async function login({ email, password }) {
  return client(API.login, {
    data: {
      email,
      password
    }
  });
}

async function logOut() {
  await client(API.logout);
}

async function register({ email, userName, password }) {
  console.log('post');
  return client(API.register, {
    data: { email, userName, password }
  });
}

export { login, logOut, register };
