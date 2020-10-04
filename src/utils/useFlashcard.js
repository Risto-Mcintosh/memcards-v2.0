import React from 'react';
import shuffle from 'lodash.shuffle';

function useFlashcard(deck = []) {
  //TODO use useReducer or an Object instead
  const [shuffledDeck, setDeck] = React.useState(shuffle(deck));
  const [card, setCard] = React.useState(null);
  const [isBack, flipCard] = React.useState(false);
  const [noCardsLeftToStudy, setComplete] = React.useState(false);
  // const [state, setState] = React.useState({
  //   shuffledDeck: shuffle(deck),
  //   card: null,
  //   isBack: false
  // });
  React.useEffect(() => {
    if (deck.length) {
      const sDeck = shuffle(deck);
      const firstCard = sDeck.pop();
      setDeck(sDeck);
      setCard(firstCard);
      flipCard(false);
      // setState({
      //   card: firstCard,
      //   shuffledDeck: sDeck
      // });
    }
  }, [deck, setDeck, setCard, flipCard]);
  const deckIsEmpty = deck.length <= 0;

  const getCard = () => {
    const cards = shuffledDeck;
    const card = cards.pop();
    if (deck.length >= 1 && !card) {
      setComplete(true);
    }
    setDeck(cards);
    setCard(card);
    flipCard((s) => !s);
    // console.log({ noCardsLeftToStudy });
    // setState((s) => ({
    //   shuffledDeck: cards,
    //   card,
    //   isBack: !s.isBack
    // }));
  };
  // const flipCard = () => setState((s) => ({ ...s, isBack: !s.isBack }));

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
