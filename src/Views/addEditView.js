import React from 'react';
import { connect } from 'react-redux';
import AddEditFrom from '../components/addEditForm/AddEditForm';
import Layout from '../components/Layout';

import { createDeck, addNewCard, updateCard } from '../actions/actionCreator';

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
    card: state.card
  };
}

export default connect(
  mapStateToProps,
  { createDeck, addNewCard, updateCard }
)(addEditView);
