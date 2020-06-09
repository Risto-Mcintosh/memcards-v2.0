import API from './urls';
import axios from 'axios';

export default function unsplash(pageNumber, searchTerm) {
  return axios(API.images(pageNumber, searchTerm), {
    headers: {
      Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_ID}`
    }
  });
}
