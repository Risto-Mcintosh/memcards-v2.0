import React from 'react';
import shuffle from 'lodash.shuffle';

function useFlashcard(deck = []) {
  //TODO use useReducer or an Object instead
  const [shuffledDeck, setShuffleDeck] = React.useState(shuffle(deck));
  const [flashcard, setCard] = React.useState(null);
  const [isBack, flipCard] = React.useState(false);
  const [isEditing, editFlashcard] = React.useState(false);
  const [noCardsLeftToStudy, setComplete] = React.useState(false);
  const deckIsEmpty = deck.length <= 0;
  const setDeck = () => {
    const sDeck = shuffle(deck);
    const firstCard = sDeck.pop();
    setShuffleDeck(sDeck);
    setCard(firstCard);
    flipCard(false);
    setComplete(false);
  };

  React.useEffect(() => {
    if (deck.length && !!flashcard) return;

    if (deck.length) {
      const sDeck = shuffle(deck);
      const firstCard = sDeck.pop();
      setShuffleDeck(sDeck);
      setCard(firstCard);
      flipCard(false);
    }
  }, [deck, setShuffleDeck, setCard, flipCard, setComplete, flashcard]);

  const getCard = (flashcard = null) => {
    if (flashcard) {
      setCard(flashcard);
      editFlashcard(false);
    } else {
      const cards = shuffledDeck;
      const card = cards.pop();
      if (deck.length >= 1 && !card) {
        setComplete(true);
      }
      setShuffleDeck(cards);
      setCard(card);
      flipCard((s) => !s);
    }
  };
  // const flipCard = () => setState((s) => ({ ...s, isBack: !s.isBack }));
  const clearCard = () => setCard(null);

  return {
    flashcard,
    isBack,
    flipCard,
    getCard,
    clearCard,
    setDeck,
    deckIsEmpty,
    noCardsLeftToStudy,
    isEditing,
    editFlashcard
  };
}

export default useFlashcard;
