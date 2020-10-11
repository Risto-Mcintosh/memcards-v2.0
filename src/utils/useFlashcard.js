import React from 'react';
import shuffle from 'lodash.shuffle';

const actionTypes = {
  initialize: 'INITIALIZE_DECK',
  flip: 'FLIP_CARD',
  edit: 'EDIT_FLASHCARD',
  nextCard: 'GET_NEXT_FLASHCARD',
  clear: 'CLEAR_CARD'
};

function getFlashCardFromDeck(deck) {
  const shuffledDeck = deck;
  const flashcard = shuffledDeck.pop();
  return {
    shuffledDeck,
    flashcard
  };
}

function flashcardReducer(state, action) {
  switch (action.type) {
    case actionTypes.initialize: {
      let currentDeck = state.currentDeck;
      if (action.initialDeck.length) {
        currentDeck = action.initialDeck;
      }
      const { shuffledDeck, flashcard } = getFlashCardFromDeck(
        shuffle(currentDeck)
      );
      return {
        ...state,
        currentDeck,
        shuffledDeck,
        flashcard,
        isEditing: false,
        showBackOfCard: false,
        noCardsLeftToStudy: false
      };
    }
    case actionTypes.nextCard: {
      const { shuffledDeck, flashcard } = getFlashCardFromDeck(
        state.shuffledDeck
      );
      return {
        ...state,
        shuffledDeck,
        flashcard,
        showBackOfCard: false,
        noCardsLeftToStudy:
          state.currentDeck.length >= 1 && !flashcard ? true : false
      };
    }
    case actionTypes.edit: {
      if (action.flashcard) {
        return {
          ...state,
          flashcard: action.flashcard,
          isEditing: false
        };
      }
      return { ...state, isEditing: true };
    }
    case actionTypes.clear:
      return { ...state, flashcard: null };
    case actionTypes.flip:
      return { ...state, showBackOfCard: !state.showBackOfCard };
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
}

function useFlashcard(deck = []) {
  const deckIsEmpty = deck.length <= 0;

  const [
    { flashcard, isEditing, noCardsLeftToStudy, showBackOfCard },
    dispatch
  ] = React.useReducer(flashcardReducer, {
    currentDeck: deck,
    shuffledDeck: [],
    flashcard: null,
    showBackOfCard: false,
    isEditing: false,
    noCardsLeftToStudy: false
  });

  const initializeDeck = React.useCallback(
    (initialDeck = []) =>
      dispatch({ type: actionTypes.initialize, initialDeck }),
    [dispatch]
  );
  const nextCard = () => dispatch({ type: actionTypes.nextCard });
  const editFlashcard = (flashcard = null) =>
    dispatch({ type: actionTypes.edit, flashcard });
  const flipCard = () => dispatch({ type: actionTypes.flip });
  const clearCard = () => dispatch({ type: actionTypes.clear });

  React.useEffect(() => {
    if (deck.length) {
      initializeDeck(deck);
    }
  }, [deck, initializeDeck]);

  return {
    flashcard,
    showBackOfCard,
    flipCard,
    nextCard,
    clearCard,
    deckIsEmpty,
    noCardsLeftToStudy,
    isEditing,
    editFlashcard,
    initializeDeck
  };
}

export default useFlashcard;
