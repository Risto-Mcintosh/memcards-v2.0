import {
  getAllDecks,
  createNewDeck,
  getAllCards,
  addCardToDB,
  editCardInDB,
  deleteDeckInDB,
  deleteCardInDB
} from "../utils/firestore";
import history from "../history";

export function hydrate() {
  return async dispatch => {
    const localStorage = await getAllDecks();

    dispatch({
      type: "HYDRATE",
      payload: localStorage
    });
  };
}

export function createDeck(values) {
  return dispatch => {
    createNewDeck(values);
    dispatch({
      type: "CREATE_NEW_DECK"
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
  return dispatch => {
    deleteDeckInDB(deckId);
    dispatch({
      type: "DELETE_DECK"
    });
  };
}

export function setCurrentDeck(deckName, editable) {
  return async dispatch => {
    let cards = await getAllCards(deckName);
    dispatch({
      type: "SET_CURRENT_DECK",
      payload: { name: deckName, editable, data: cards }
    });
    if (cards.length <= 0) {
      history.push(`/decks`);
    }
  };
}

export function getCard(cardId) {
  return (dispatch, getState) => {
    let deck = getState().deck;
    let card;
    console.log("deck: ", deck);

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
  return dispatch => {
    addCardToDB(values);
    dispatch({
      type: "ADD_NEW_CARD"
    });
  };
}

export function updateCard(deckId, card, cardId) {
  return async dispatch => {
    editCardInDB(deckId, card, cardId);
    dispatch({
      type: "UPDATE_CARD"
    });
    history.push(`/deck/${card.deckName}`, {
      deckName: card.deckName,
      cardId
    });
  };
}

export function deleteCard(deck, cardId) {
  return async dispatch => {
    deleteCardInDB(deck._id, cardId);
    dispatch({
      type: "DELETE_CARD"
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
