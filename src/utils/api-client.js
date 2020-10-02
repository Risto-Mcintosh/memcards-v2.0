import axios from 'axios';

export default async function client(url, { data, ...config } = {}) {
  const response = await axios({
    url,
    method: data ? 'post' : 'get',
    data: data,
    ...config
  });
  console.log({ response });
  if (response.statusText === 'OK') {
    return response.data;
  } else {
    return Promise.reject(response.data);
  }
}
