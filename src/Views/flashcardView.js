/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import FlashCard from '../components/FlashCard';
import Layout from '../components/Layout';
import FlipCard from '../components/FlipCard';
import { getCard, flipCard, setCurrentDeck } from '../actions/actionCreator';

function Flashcard(props) {
  const { deck, card, location, getCard, decks } = props;

  if (
    Object.entries(decks) <= 0 ||
    (Object.entries(deck) <= 0 && Object.entries(card) <= 0 && !location.state)
  ) {
    return <Redirect to="/decks" />;
  }
  if (location.state && Object.entries(card) <= 0) {
    getCard(location.state.card);
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

Flashcard.propTypes = {
  getCard: PropTypes.func.isRequired,
  deck: PropTypes.object,
  card: PropTypes.object,
  location: PropTypes.object,
  decks: PropTypes.array
};

Flashcard.defaultProps = {
  deck: {},
  card: {},
  location: {},
  decks: {}
};
