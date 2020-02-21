import API from './urls';
import axios from 'axios';

export default function unsplash(pageNumber: number, searchTerm: string) {
  return axios(API.images, {
    params: {
      page: pageNumber,
      searchTerm
    }
  });
}
