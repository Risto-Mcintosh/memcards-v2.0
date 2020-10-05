import React from 'react';
import shuffle from 'lodash.shuffle';

function useFlashcard(deck = []) {
  //TODO use useReducer or an Object instead
  const [shuffledDeck, setShuffleDeck] = React.useState(shuffle(deck));
  const [flashcard, setCard] = React.useState(null);
  const [isBack, flipCard] = React.useState(false);
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
  // const [state, setState] = React.useState({
  //   shuffledDeck: shuffle(deck),
  //   card: null,
  //   isBack: false
  // });
  React.useEffect(() => {
    if (deck.length) {
      const sDeck = shuffle(deck);
      const firstCard = sDeck.pop();
      setShuffleDeck(sDeck);
      setCard(firstCard);
      flipCard(false);
      // setState({
      //   card: firstCard,
      //   shuffledDeck: sDeck
      // });
    }
  }, [deck, setShuffleDeck, setCard, flipCard, setComplete]);

  const getCard = () => {
    const cards = shuffledDeck;
    const card = cards.pop();
    if (deck.length >= 1 && !card) {
      setComplete(true);
    }
    setShuffleDeck(cards);
    setCard(card);
    flipCard((s) => !s);
    // console.log({ noCardsLeftToStudy });
    // setState((s) => ({
    //   shuffledDeck: cards,
    //   flashcard,
    //   isBack: !s.isBack
    // }));
  };
  // const flipCard = () => setState((s) => ({ ...s, isBack: !s.isBack }));

  return {
    flashcard,
    isBack,
    flipCard,
    getCard,
    setDeck,
    deckIsEmpty,
    noCardsLeftToStudy
  };
}

export default useFlashcard;
