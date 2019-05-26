import React from "react";
import AddEditFrom from "../components/addEditForm/AddEditForm";
import Layout from "../components/Layout";
import { connect } from "react-redux";
import { createDeck, addNewCard, updateCard } from "../actions/actionCreator";

function addEditView(props) {
  return (
    <Layout>
      <AddEditFrom {...props} />
    </Layout>
  );
}

function mapStateToProps(state) {
  return {
    decks: state.decks,
    deck: state.deck,
    card: state.card,
    snackBar: state.snackBar
  };
}

export default connect(
  mapStateToProps,
  { createDeck, addNewCard, updateCard }
)(addEditView);
