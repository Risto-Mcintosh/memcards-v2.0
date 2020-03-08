import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import AllDecks from '../components/AllDecks';
import {
  setCurrentDeck,
  clearCard,
  deleteDeck,
  getCard
} from '../actions/actionCreator';
import Loading from '../components/loading';

function AllDecksView(props) {
  const { clearCard, user } = props;
  useEffect(() => {
    clearCard();
  });

  if (!user.isAuthenticated) {
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
    deck: state.deck,
    user: state.user
  };
}

export default connect(mapStateToProps, {
  setCurrentDeck,
  clearCard,
  deleteDeck,
  getCard
})(AllDecksView);

AllDecksView.propTypes = {
  clearCard: PropTypes.func.isRequired,
  decks: PropTypes.array.isRequired
};
