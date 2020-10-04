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

const onFlashcardDelete = (card) => {
  const prevData = queryCache.getQueryData('deck');
  if (prevData) {
    queryCache.setQueryData(
      'deck',
      prevData.filter((deck) => deck.id !== card.id)
    );
  }
  return prevData;
};

function useFlashcardDelete() {
  return useMutation(
    (card) =>
      client(URLS.editORDeleteCard(card.deckId, card.id), { method: 'delete' }),
    {
      onMutate: onFlashcardDelete,
      onError: (error, deck, prevData) => queryCache.setQueryData(prevData)
      // onSettled: () => queryCache.invalidateQueries('deck')
    }
  );
}
export { useDeckList, useDeck, useDeckDelete, useFlashcardDelete };
