import client from './api-client';
import URLS from '../service/urls';
import { useQuery, useMutation, queryCache } from 'react-query';
import { useAuth } from 'context/auth-context';

function useDeckList() {
  const { userId } = useAuth().user;
  return useQuery({
    queryKey: 'deckList',
    queryFn: () => client(URLS.getAllDecks, { params: { userId } })
  });
}

function useFlashcards(deckId) {
  return useQuery({
    queryKey: `deck ${deckId}`,
    queryFn: () => client(URLS.getDeck(deckId))
  });
}

const onDeckCreate = (responseData, deck) => {
  const prevData = queryCache.getQueryData('deckList');
  if (prevData) {
    const newDeckList = [
      ...prevData,
      { name: deck.deckName, id: responseData, cardCount: 1 }
    ];
    queryCache.setQueryData('deckList', newDeckList);
  }
  return prevData;
};

function useDeckCreate() {
  const { userId } = useAuth().user;
  return useMutation(
    (deck) =>
      client(URLS.createDeck, {
        data: deck,
        method: 'post',
        params: { userId }
      }),
    {
      onSuccess: onDeckCreate,
      onError: (error, deck, prevData) => queryCache.setQueryData(prevData),
      onSettled: () => queryCache.invalidateQueries('deckList')
    }
  );
}
const onDeckDelete = (deckId) => {
  queryCache.cancelQueries('deckList');
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
  queryCache.cancelQueries(`deck ${card.deckId}`);

  const prevData = queryCache.getQueryData(`deck ${card.deckId}`);
  if (prevData) {
    const newFlashcardSet = prevData.cards.filter(
      (deck) => deck.id !== card.id
    );
    queryCache.setQueryData(`deck ${card.deckId}`, {
      ...prevData,
      cards: newFlashcardSet
    });
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
      // onSuccess: (res, card ) => queryCache.invalidateQueries(`deck ${card.deckId}`)
    }
  );
}

const onFlashcardEdit = ({ card, cardId, deckId }) => {
  // queryCache.invalidateQueries('deck', {
  //   refetchActive: false
  // });
  queryCache.cancelQueries(`deck ${deckId}`);

  const prevData = queryCache.getQueryData(`deck ${deckId}`);
  if (prevData) {
    function editCardInCache(cardInCache) {
      if (cardInCache.id === cardId) return { ...cardInCache, ...card };
      return cardInCache;
    }

    queryCache.setQueryData(`deck ${deckId}`, {
      ...prevData,
      cards: prevData.cards.map(editCardInCache)
    });
  }
  return prevData;
};

function useFlashcardEdit() {
  return useMutation(
    ({ card, cardId, deckId }) =>
      client(URLS.editORDeleteCard(deckId, cardId), {
        data: card,
        method: 'put'
      }),
    {
      onMutate: onFlashcardEdit
    }
  );
}

const onFlashcardCreate = ({ deckId }) => {
  queryCache.cancelQueries('deckList');

  const prevData = queryCache.getQueryData('deckList');
  if (prevData) {
    function updateCardCount(deck) {
      if (deck.id === deckId) return { ...deck, cardCount: deck.cardCount++ };
      return deck;
    }
    queryCache.setQueryData('deckList', prevData.map(updateCardCount));
  }

  return prevData;
};

function useFlashcardCreate() {
  return useMutation(
    ({ card, deckId }) => {
      client(URLS.createCard(deckId), { data: card });
    },
    {
      onMutate: onFlashcardCreate,
      onSettled: (response, error, { deckId }) =>
        queryCache.removeQueries(`deck ${deckId}`)
    }
  );
}
export {
  useDeckList,
  useDeckCreate,
  useDeckDelete,
  useFlashcards,
  useFlashcardDelete,
  useFlashcardEdit,
  useFlashcardCreate
};
