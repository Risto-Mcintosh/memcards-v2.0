import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FlashCard from '../components/FlashCard';
import Layout from '../components/Layout';
import FlipCard from '../components/FlipCard';
import { getCard, flipCard, setCurrentDeck } from '../actions/actionCreator';

function Flashcard(props) {
  const {
 deck, card, location, setCurrentDeck, getCard, decks 
} = props;

  if (
    Object.entries(decks) <= 0
    || (Object.entries(deck) <= 0 && Object.entries(card) <= 0 && !location.state)
  ) {
    return <Redirect to="/decks" />;
  }
  if (location.state && Object.entries(card) <= 0) {
    setCurrentDeck(location.state.deckName);
    getCard(location.state.cardId);
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Flashcard);
