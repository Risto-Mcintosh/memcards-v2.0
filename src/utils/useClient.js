import client from './api-client';
import URLS from '../service/urls';
import { useQuery, useMutation, queryCache } from 'react-query';

function useDeckList() {
  return useQuery({
    queryKey: 'deckList',
    queryFn: () => client(URLS.getAllDecks)
  });
}

export { useDeckList };
