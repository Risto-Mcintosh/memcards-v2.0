import axios from 'axios';
import { setAuthenticatedUser, hydrate } from '../actions/actionCreator';
import history from '../history';
import store from '../store';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export interface LoginUserValues {
  email: string;
  password: string;
}

export async function loginUser({ email, password }: LoginUserValues) {
  return await axios.post('/api/login', {
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
  return await axios.post('/api/register', {
    email,
    userName,
    password
  });
}
