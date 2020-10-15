import axios from 'axios';

export default async function client(url, { data, ...config } = {}) {
  const response = await axios({
    url,
    method: data ? 'post' : 'get',
    data: data,
    ...config
  });
  if (response.statusText === 'OK' || response.statusText === 'Created') {
    return response.data;
  } else {
    return Promise.reject(response.data);
  }
}
