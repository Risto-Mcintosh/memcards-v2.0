import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FlashCard from "../components/flashcard/Flashcard";
import Layout from "../components/Layout";
import FlipCard from "../components/FlipCard";
import { getCard, flipCard, setCurrentDeck } from "../actions/actionCreator";

function Flashcard(props) {
  const { deck, card } = props;

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
