import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import AllDecks from '../components/AllDecks';
import {
  setCurrentDeck,
  clearCard,
  getCard,
  deleteDeck,
} from '../actions/actionCreator';
import Loading from '../components/loading';

function AllDecksView(props) {
  useEffect(() => {
    props.clearCard();
    // eslint-disable-next-line
  }, []);

  if (props.decks.length <= 0) {
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
  };
}

export default connect(
  mapStateToProps,
  {
    setCurrentDeck,
    clearCard,
    getCard,
    deleteDeck,
  },
)(AllDecksView);
