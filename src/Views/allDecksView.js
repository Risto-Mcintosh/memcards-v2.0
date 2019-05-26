import React, { useEffect } from "react";
import Layout from "../components/Layout";
import AllDecks from "../components/AllDecks";
import { connect } from "react-redux";
import {
  setCurrentDeck,
  clearCard,
  getCard,
  deleteDeck
} from "../actions/actionCreator";

function allDecksView(props) {
  useEffect(() => {
    props.clearCard();
  }, []);

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

export default connect(
  mapStateToProps,
  { setCurrentDeck, clearCard, getCard, deleteDeck }
)(allDecksView);
