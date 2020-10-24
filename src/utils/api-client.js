import axios from 'axios';
import { localStorageKey, getToken } from 'service/auth';

export default async function client(url, { data, ...config } = {}) {
  try {
    // TODO Get Token from memory (if you can) instead of pulling from localStorage
    const { token } = await getToken();
    const response = await axios({
      url,
      method: data ? 'post' : 'get',
      data: data,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
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
