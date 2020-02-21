import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NewDeckForm from '../components/addEditForm/NewDeck';
import EditCardForm from '../components/addEditForm/EditCard';
import NewCardForm from '../components/addEditForm/NewCard';
import Layout from '../components/Layout';
import {
  createDeck,
  addNewCard,
  updateCard,
  getCard
} from '../actions/actionCreator';

function loadComponent(props) {
  switch (props.match.path) {
    case '/add/newdeck':
      return <NewDeckForm {...props} />;
    case '/edit/card/:cardId':
      return <EditCardForm {...props} />;
    case '/add/card':
      return <NewCardForm {...props} />;
    default:
      return <Redirect to="/" />;
  }
}

function addEditView(props) {
  return <Layout>{loadComponent(props)}</Layout>;
}

function mapStateToProps(state) {
  return {
    decks: state.decks,
    deck: state.deck,
    card: state.card
  };
}

export default connect(mapStateToProps, {
  createDeck,
  addNewCard,
  updateCard,
  getCard
})(addEditView);
