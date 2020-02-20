import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import AllDecks from '../components/AllDecks';
import {
  setCurrentDeck,
  clearCard,
  deleteDeck
} from '../actions/actionCreator';
import Loading from '../components/loading';

function AllDecksView(props) {
  const { clearCard, decks } = props;
  useEffect(() => {
    clearCard();
  }, []);

  if (decks.length <= 0) {
    return <Loading loader />;
  }

  return (
    <Layout>
      <AllDecks {...props} />
    </Layout>
  );
}

function mapStateToProps(state) {
  return {
    decks: state.decks,
    deck: state.deck
  };
}

export default connect(mapStateToProps, {
  setCurrentDeck,
  clearCard,
  deleteDeck
})(AllDecksView);

AllDecksView.propTypes = {
  clearCard: PropTypes.func.isRequired,
  decks: PropTypes.array.isRequired
};
