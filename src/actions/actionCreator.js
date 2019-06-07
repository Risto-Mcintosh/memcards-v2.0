import {
  getAllDecks,
  createNewDeck,
  addCardToDB,
  editCardInDB,
  deleteDeckInDB,
  deleteCardInDB
} from "../utils/firestore";
import filterState from "../utils/filter";
import history from "../history";

export function hydrate() {
  return async dispatch => {
    let cloudStorage;
    try {
      cloudStorage = await getAllDecks();
    } catch (e) {
      console.log(e);
      console.log(cloudStorage);
    }

    dispatch({
      type: "HYDRATE",
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
    let state = getState().decks;
    const cardId = await createNewDeck(values);

    dispatch({
      type: "CREATE_NEW_DECK",
      payload: filterState(
        state,
        deckName,
        [{ id: cardId, front, back, image }],
        cardId
      )
    });
    history.push("/add/card", {
      selectedDeckName: values.deckName,
      snackBar: { message: "New Deck Created!" }
    });
  };
}

export function deleteDeckToggle(bool) {
  return {
    type: "DELETE_DECK_TOGGLE",
    payload: !bool
  };
}
export function deleteDeck(deckId) {
  return (dispatch, getState) => {
    deleteDeckInDB(deckId);
    const currentDecks = getState().decks;
    const newDeckList = currentDecks.filter(deck => deck.id !== deckId);
    console.log(newDeckList);

    dispatch({
      type: "DELETE_DECK",
      payload: newDeckList
    });
  };
}

export function setCurrentDeck(deckName) {
  return async (dispatch, getState) => {
    const deck = getState().decks.find(item => {
      const nameFound = typeof deckName === "string" ? deckName : deckName.name;

      return item.name === nameFound;
    });
    dispatch({
      type: "SET_CURRENT_DECK",
      payload: { ...deck }
    });
    if (deck.data.length <= 0) {
      history.push(`/decks`);
    }
  };
}

export function getCard(cardId) {
  return (dispatch, getState) => {
    let deck = getState().deck;
    let card;

    const randomNumber = Math.floor(Math.random() * deck.data.length);

    if (cardId === "random") {
      card = randomNumber;
    } else {
      card = deck.data.findIndex(card => card.id === cardId);
    }

    let selectedCard = deck.data[card];
    if (selectedCard === undefined) {
      history.push("/decks");
      selectedCard = {};
    }
    dispatch({
      type: "GET_CARD",
      payload: selectedCard
    });
  };
}

export function addNewCard(values) {
  return async (dispatch, getState) => {
    let state = getState().decks;
    const {
      deckName,
      frontOfCard: front,
      backOfCard: back,
      cardImage: image
    } = values;

    const cardId = await addCardToDB(values);
    dispatch({
      type: "ADD_NEW_CARD",
      payload: filterState(
        state,
        deckName,
        [{ id: cardId, front, back, image }],
        cardId
      )
    });
  };
}

export function updateCard(deckId, card, cardId) {
  return async (dispatch, getState) => {
    let state = getState().decks;
    const { frontOfCard: front, backOfCard: back, cardImage: image } = card;

    editCardInDB(deckId, card, cardId);

    dispatch({
      type: "UPDATE_CARD",
      payload: filterState(
        state,
        card.deckName,
        [{ id: cardId, front, back, image }],
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
    let state = getState().decks;
    deleteCardInDB(deck.id, cardId);
    const currentDeck = getState().deck;

    const newCards = currentDeck.data.filter(card => card.id !== cardId);
    console.log("newCards :", newCards);

    dispatch({
      type: "DELETE_CARD",
      payload: filterState(state, deck.id, newCards)
    });

    history.push(`/deck/${deck.name}`, {
      deckName: deck.name,
      cardId: "random"
    });
  };
}

export function clearCard() {
  return {
    type: "CLEAR_CARD"
  };
}

export function flipCard(bool) {
  return {
    type: "FLIP_CARD",
    payload: !bool
  };
}
