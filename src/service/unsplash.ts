import API from './urls';
import axios from 'axios';

export default function unsplash(pageNumber: number, searchTerm: string) {
  return axios(API.images(pageNumber, searchTerm), {
    headers: {
      Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_ID}`
    }
  });
}
