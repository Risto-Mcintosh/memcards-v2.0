import React from 'react';
import { connect } from 'react-redux';
import FlashCard from '../components/flashcard/Flashcard';
import Layout from '../components/Layout';
import FlipCard from '../components/FlipCard';
import { getCard, flipCard, setCurrentDeck } from '../actions/actionCreator';
import Loading from '../components/loading';
import { useDeck } from '../utils/useClient';
import { useParams, useHistory } from 'react-router-dom';
import useFlashcard from '../utils/useFlashcard';

function Flashcard(props) {
  const { deck } = props;
  const { deckId } = useParams();
  const history = useHistory();
  const { data, isLoading } = useDeck(deckId);
  const { card, getCard, isBack, flipCard, noCardsLeftToStudy } = useFlashcard(
    data
  );
  if (noCardsLeftToStudy) {
    return history.push('/completed');
  }
  if (!card || isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <FlashCard card={card} deckName={deck.name} isBack={isBack} />
      <FlipCard
        {...props}
        flipCard={flipCard}
        isBack={isBack}
        getCard={getCard}
      />
    </Layout>
  );
}

function mapStateToProps(state) {
  return {
    decks: state.decks,
    deck: state.deck,
    card: state.card
  };
}
const mapDispatchToProps = {
  // getCard,
  flipCard,
  setCurrentDeck
};

export default connect(mapStateToProps, mapDispatchToProps)(Flashcard);
