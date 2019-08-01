import shuffle from 'lodash.shuffle';
import {
  getAllDecks,
  createNewDeck,
  addCardToDB,
  editCardInDB,
  deleteDeckInDB,
  deleteCardInDB
} from '../utils/firestore';
import filterState from '../utils/filter';
import history from '../history';

export function hydrate() {
  return async (dispatch, getState) => {
    const { uid } = getState().user;
    let cloudStorage;
    try {
      cloudStorage = await getAllDecks(uid);
    } catch (e) {
      console.log(e);
    }

    dispatch({
      type: 'HYDRATE',
      payload: cloudStorage
    });
  };
}

export function createDeck(values) {
  return async (dispatch, getState) => {
    const {
      deckName,
      frontOfCard: front,
      backOfCard: back,
      cardImage: image
    } = values;
    const state = getState().decks;
    const { uid } = getState().user;

    history.push('/add/card', {
      selectedDeckName: values.deckName,
      snackBar: { show: true, message: 'New Deck Created!' }
    });

    const cardId = await createNewDeck(values, uid);

    dispatch({
      type: 'CREATE_NEW_DECK',
      payload: filterState(
        state,
        deckName,
        [
          {
            id: cardId,
            front,
            back,
            image
          }
        ],
        cardId
      )
    });
  };
}

export function deleteDeckToggle(bool = false) {
  return {
    type: 'DELETE_DECK_TOGGLE',
    payload: !bool
  };
}
export function deleteDeck(deckId) {
  return (dispatch, getState) => {
    const { uid } = getState().user;
    deleteDeckInDB(deckId, uid);
    const currentDecks = getState().decks;
    const newDeckList = currentDecks.filter(deck => deck.id !== deckId);

    dispatch({
      type: 'DELETE_DECK',
      payload: newDeckList
    });
  };
}

export function setCurrentDeck(deckName) {
  return async (dispatch, getState) => {
    const deck = getState().decks.find((item) => {
      const nameFound = typeof deckName === 'string' ? deckName : deckName.name;
      return item.name === nameFound;
    });
    const shuffledDeck = shuffle(deck.data);
    dispatch({
      type: 'SET_CURRENT_DECK',
      payload: { ...deck, shuffledDeck }
    });
    if (deck.data.length <= 0) {
      history.push('/decks');
    }
  };
}

export function getCard(cardId) {
  return (dispatch, getState) => {
    const { deck } = getState();
    const { shuffledDeck, data } = deck;
    let selectedCard;

    if (cardId === 'random') {
      selectedCard = shuffledDeck.pop();
    } else {
      const foundCard = deck.data.findIndex(card => card.id === cardId);
      selectedCard = data[foundCard];
    }

    if (data.length <= 0) {
      history.push('/decks');
      selectedCard = {};
    }
    if (data.length >= 1 && selectedCard === undefined) {
      history.push('/completed');
      selectedCard = {};
    }
    dispatch({
      type: 'GET_CARD',
      payload: selectedCard
    });
  };
}

export function addNewCard(values) {
  return async (dispatch, getState) => {
    const { uid } = getState().user;
    const state = getState().decks;
    const {
      deckName,
      frontOfCard: front,
      backOfCard: back,
      cardImage: image
    } = values;

    const cardId = await addCardToDB(values, uid);
    dispatch({
      type: 'ADD_NEW_CARD',
      payload: filterState(
        state,
        deckName,
        [
          {
            id: cardId,
            front,
            back,
            image
          }
        ],
        cardId
      )
    });
  };
}

export function updateCard(deckId, card, cardId) {
  return async (dispatch, getState) => {
    const state = getState().decks;
    const { uid } = getState().user;
    const { frontOfCard: front, backOfCard: back, cardImage: image } = card;

    editCardInDB(deckId, card, cardId, uid);

    dispatch({
      type: 'UPDATE_CARD',
      payload: filterState(
        state,
        card.deckName,
        [
          {
            id: cardId,
            front,
            back,
            image
          }
        ],
        cardId
      )
    });
    history.push(`/deck/${card.deckName}`, {
      deckName: card.deckName,
      cardId
    });
  };
}

export function deleteCard(deck, cardId) {
  return async (dispatch, getState) => {
    const state = getState().decks;
    const { uid } = getState().user;
    deleteCardInDB(deck.id, cardId, uid);
    const currentDeck = getState().deck;

    const newCards = currentDeck.data.filter(card => card.id !== cardId);

    dispatch({
      type: 'DELETE_CARD',
      payload: filterState(state, deck.id, newCards)
    });

    history.push(`/deck/${deck.name}`, {
      deckName: deck.name,
      cardId: 'random'
    });
  };
}

export function clearCard() {
  return {
    type: 'CLEAR_CARD'
  };
}

export function flipCard(bool = false) {
  return {
    type: 'FLIP_CARD',
    payload: !bool
  };
}

export function setAuthenticatedUser(bool, uid) {
  return {
    type: 'AUTHENTICATED_USER',
    payload: { bool, uid }
  };
}
