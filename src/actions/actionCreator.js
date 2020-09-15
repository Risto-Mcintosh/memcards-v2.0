import shuffle from 'lodash.shuffle';
import DataService from '../service/data';
import history from '../history';

let db;

export function setAuthenticatedUser(isAuthenticated, user) {
  return (dispatch) => {
    dispatch({
      type: 'AUTHENTICATED_USER',
      payload: { isAuthenticated, user }
    });
    console.log({ user });
    if (isAuthenticated) {
      localStorage.setItem('user', JSON.stringify(user));
      history.push('/');
    } else {
      history.push('/login');
    }
  };
}

function handleResponseRejection(err, dispatch) {
  console.log({ err: err.message });
  const { status } = err.response;
  if (status === 400 || status === 401) {
    dispatch(setAuthenticatedUser(false, {}));
  }
  history.push('/');
}

export function hydrate() {
  return async (dispatch, getState) => {
    let user;
    if (process.env.REACT_APP_NO_SERVER) {
      user = { userId: 123 };
    } else {
      user = JSON.parse(localStorage.getItem('user')) || getState().user;
    }

    if (!Object.entries(user).length)
      return dispatch(setAuthenticatedUser(false, {}));

    db = new DataService(user.userId);

    await db
      .getAllDecks()
      .then((res) => {
        dispatch({
          type: 'HYDRATE',
          payload: res.data
        });
      })
      .catch((err) => handleResponseRejection(err, dispatch));
  };
}

export function createDeck(values) {
  return async (dispatch) => {
    const deckId = await db
      .createNewDeck(values)
      .then((res) => res.data)
      .catch((err) => handleResponseRejection(err, dispatch));

    dispatch({
      type: 'CREATE_NEW_DECK',
      payload: { name: values.deckName, id: deckId, cardCount: 1 }
    });

    history.push('/add/card', {
      selectedDeckName: values.deckName,
      snackBar: { show: true, message: 'New Deck Created!' }
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
    db.deleteDeckInDB(deckId).catch((err) =>
      handleResponseRejection(err, dispatch)
    );
    const currentDecks = getState().decks;
    const newDeckList = currentDecks.filter((deck) => deck.id !== deckId);

    dispatch({
      type: 'DELETE_DECK',
      payload: newDeckList
    });
  };
}

export function setCurrentDeck(deckName) {
  return async (dispatch, getState) => {
    let deckInMemory = getState().deck;
    let payload;

    if (deckName === deckInMemory.name) {
      payload = shuffledDeckWithDataFromStore();
    } else {
      deckInMemory = selectNewDeckFromState();
      payload = await getDeckFromDB(deckInMemory);
    }

    dispatch({
      type: 'SET_CURRENT_DECK',
      payload
    });

    if (deckInMemory.cardCount <= 0) {
      history.push('/decks');
    }

    function shuffledDeckWithDataFromStore() {
      deckInMemory.shuffledDeck = shuffle(deckInMemory.data);
      return deckInMemory;
    }

    async function getDeckFromDB(deck) {
      const dataFromDB = await db
        .getDeck(deck.id)
        .then((res) => res.data)
        .catch((err) => handleResponseRejection(err, dispatch));
      return {
        ...deck,
        data: dataFromDB,
        shuffledDeck: shuffle(dataFromDB)
      };
    }

    function selectNewDeckFromState() {
      return getState().decks.find((item) => {
        const nameFound =
          typeof deckName === 'string' ? deckName : deckName.name;
        return item.name === nameFound;
      });
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

    const deckToEdit = state.find((deck) => deck.name === values.deckName);

    await db
      .addCardToDB(values, deckToEdit.id)
      .then((res) => res.data.cardId)
      .catch((err) => handleResponseRejection(err, dispatch));

    dispatch({
      type: 'ADD_NEW_CARD',
      payload: incrementDeckCardCount()
    });

    function incrementDeckCardCount() {
      return state.map((deck) => {
        if (deck.id === deckToEdit.id) {
          ++deck.cardCount;
        }
        return deck;
      });
    }
  };
}

export function updateCard(deckId, card, cardId) {
  return async (dispatch) => {
    db.editCardInDB(deckId, card, cardId).catch((err) =>
      handleResponseRejection(err, dispatch)
    );

    history.push(`/deck/${card.deckName}`);

    dispatch({
      type: 'UPDATE_CARD'
    });
  };
}

export function deleteCard(deck, cardId) {
  return async (dispatch, getState) => {
    const state = getState().decks;

    db.deleteCardInDB(deck.id, cardId);
    const selectedDeck = getState().deck;

    const newCards = selectedDeck.data.filter((card) => card.id !== cardId);

    dispatch({
      type: 'DELETE_CARD',
      payload: {
        stateUpdate: decrementDeckCardCount(),
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

    function decrementDeckCardCount() {
      return state.map((deck) => {
        if (deck.id === selectedDeck.id) {
          --deck.cardCount;
        }
        return deck;
      });
    }
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

export function logout() {
  localStorage.removeItem('user');
  window.location.reload();
  return {
    type: 'LOGOUT_USER'
  };
}
