import shuffle from 'lodash.shuffle';
import { AxiosError } from 'axios';
import DataService from '../service/data';
import filterState from '../utils/filter';
import history from '../history';

let db: DataService;

export function setAuthenticatedUser(isAuthenticated: boolean, user) {
  return dispatch => {
    console.log('isAuthenticated', isAuthenticated);
    dispatch({
      type: 'AUTHENTICATED_USER',
      payload: { isAuthenticated, user }
    });
    if (isAuthenticated) {
      history.push('/');
    } else {
      history.push('/login');
    }
  };
}

function handleResponseRejection(err: AxiosError, dispatch) {
  const { status } = err.response;
  console.log('handleResponseRejection');
  if (status === 400 || status === 401) {
    dispatch(setAuthenticatedUser(false, {}));
  }
  history.push('/');
}

export function hydrate() {
  return async (dispatch, getState) => {
    const userId = localStorage.getItem('userId') || getState().user.userId;
    db = new DataService(userId);
    await db
      .getAllDecks()
      .then(res => {
        dispatch({
          type: 'HYDRATE',
          payload: res.data
        });
      })
      .catch(err => handleResponseRejection(err, dispatch));
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

    history.push('/add/card', {
      selectedDeckName: values.deckName,
      snackBar: { show: true, message: 'New Deck Created!' }
    });

    const cardId = await db
      .createNewDeck(values)
      .then(res => res.data)
      .catch(err => handleResponseRejection(err, dispatch));

    const deckId = `deckName${Math.random()}`;
    dispatch({
      type: 'CREATE_NEW_DECK',
      payload: filterState(
        state,
        deckName,
        deckId,
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
    db.deleteDeckInDB(deckId).catch(err =>
      handleResponseRejection(err, dispatch)
    );
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
    const deck = getState().decks.find(item => {
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

export function getCard(card) {
  return (dispatch, getState) => {
    const { deck } = getState();
    const { shuffledDeck, data } = deck;
    let selectedCard = card === 'random' ? shuffledDeck.pop() : card;

    const deckIsEmpty = data.length <= 0;
    const noCardsLeftToStudy = data.length >= 1 && !selectedCard;

    if (deckIsEmpty) {
      history.push('/decks');
      selectedCard = {};
    }
    if (noCardsLeftToStudy) {
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
    const state = getState().decks;
    const {
      deckName,
      frontOfCard: front,
      backOfCard: back,
      cardImage: image
    } = values;

    const { id: deckId } = state.find(deck => deck.name === deckName);
    const cardId = await db
      .addCardToDB(values, deckId)
      .then(res => res.data.cardId)
      .catch(err => handleResponseRejection(err, dispatch));
    dispatch({
      type: 'ADD_NEW_CARD',
      payload: filterState(
        state,
        deckName,
        deckId,
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
    const { frontOfCard: front, backOfCard: back, cardImage: image } = card;

    db.editCardInDB(deckId, card, cardId).catch(err =>
      handleResponseRejection(err, dispatch)
    );

    history.push(`/deck/${card.deckName}`, {
      deckName: card.deckName,
      card: {
        id: cardId,
        front,
        back,
        image
      }
    });

    dispatch({
      type: 'UPDATE_CARD',
      payload: filterState(
        state,
        card.deckName,
        deckId,
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

export function deleteCard(deck, cardId) {
  return async (dispatch, getState) => {
    const state = getState().decks;
    console.log(cardId);

    db.deleteCardInDB(deck.id, cardId);
    const currentDeck = getState().deck;

    const newCards = currentDeck.data.filter(card => card.id !== cardId);

    dispatch({
      type: 'DELETE_CARD',
      payload: {
        filteredState: filterState(state, deck.name, deck.id, newCards),
        newCards
      }
    });

    if (newCards.length === 0) {
      return history.push('/decks');
    }

    history.push(`/deck/${deck.name}`, {
      deckName: deck.name,
      card: 'random'
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
