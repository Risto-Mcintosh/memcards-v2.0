import client from './api-client';
import URLS from '../service/urls';
import { useQuery, useMutation, queryCache } from 'react-query';

function useDeckList() {
  return useQuery({
    queryKey: 'deckList',
    queryFn: () => client(URLS.getAllDecks)
  });
}

function useDeck(deckId) {
  return useQuery({
    queryKey: 'deck',
    queryFn: () => client(URLS.getDeck(deckId))
  });
}
export { useDeckList, useDeck };
