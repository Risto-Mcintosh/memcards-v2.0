import axios from 'axios';
import API from './urls';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export interface LoginUserValues {
  email: string;
  password: string;
}

export async function loginUser({ email, password }: LoginUserValues) {
  return axios.post(API.login, {
    email,
    password
  });
}

export interface RegisterUserValues {
  email: string;
  userName: string;
  password: string;
}

export async function registerUser({
  email,
  userName,
  password
}: RegisterUserValues) {
  return axios.post(API.register, {
    email,
    userName,
    password
  });
}
