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

const onDeckDelete = (deckId) => {
  const prevData = queryCache.getQueryData('deckList');

  if (prevData) {
    const newDeckList = prevData.filter((deck) => deck.id !== deckId);
    queryCache.setQueryData('deckList', newDeckList);
  }
  return prevData;
};

function useDeckDelete() {
  return useMutation(
    (deckId) => client(URLS.deleteDeck(deckId), { method: 'delete' }),
    {
      onMutate: onDeckDelete,
      onError: (error, deck, prevData) => queryCache.setQueryData(prevData),
      onSettled: () => queryCache.invalidateQueries('deckList')
    }
  );
}
export { useDeckList, useDeck, useDeckDelete };
