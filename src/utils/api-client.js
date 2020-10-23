import axios from 'axios';
import { localStorageKey } from 'service/auth';

export default async function client(url, { data, ...config } = {}) {
  try {
    const response = await axios({
      url,
      method: data ? 'post' : 'get',
      data: data,
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

  // if (response.statusText === 'OK' || response.statusText === 'Created') {
  //   console.log(response, 'from client');
  //   return response.data;
  // } else {
  //   console.log(response, 'from client');
  //   return Promise.reject(response.data);
  // }
}
