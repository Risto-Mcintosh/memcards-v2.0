import React from 'react';
import { connect } from 'react-redux';
import FlashCard from '../components/flashcard/Flashcard';
import Layout from '../components/Layout';
import FlipCard from '../components/FlipCard';
import { getCard, flipCard, setCurrentDeck } from '../actions/actionCreator';
import Loading from '../components/loading';

function Flashcard(props) {
  const { deck, card } = props;
  if (!card.front) {
    return <Loading />;
  }
  return (
    <Layout>
      <FlashCard card={card} deckName={deck.name} />
      <FlipCard {...props} />
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
  getCard,
  flipCard,
  setCurrentDeck
};

export default connect(mapStateToProps, mapDispatchToProps)(Flashcard);
