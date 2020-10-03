import React from 'react';
import shuffle from 'lodash.shuffle';

function useFlashcard(deck = []) {
  //TODO use useReducer or an Object instead
  const [shuffledDeck, setDeck] = React.useState(shuffle(deck));
  const [card, setCard] = React.useState(null);
  const [isBack, flipCard] = React.useState(false);

  React.useEffect(() => {
    if (deck) {
      const sDeck = shuffle(deck);
      const firstCard = sDeck.pop();
      setDeck(sDeck);
      setCard(firstCard);
    }
  }, [deck, setDeck]);
  const deckIsEmpty = deck.length <= 0;
  const noCardsLeftToStudy = deck.length >= 1 && !card;

  const getCard = () => {
    const cards = shuffledDeck;
    const card = cards.pop();
    setDeck(cards);
    setCard(card);
    flipCard((s) => !s);
  };

  return {
    card,
    isBack,
    flipCard,
    getCard,
    deckIsEmpty,
    noCardsLeftToStudy
  };
}

export default useFlashcard;
