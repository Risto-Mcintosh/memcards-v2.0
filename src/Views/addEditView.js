import React from 'react';
import { Redirect } from 'react-router-dom';
import NewDeckForm from '../components/addEditForm/NewDeck';
import EditCardForm from '../components/addEditForm/EditCard';
import NewCardForm from '../components/addEditForm/NewCard';
import Layout from '../components/Layout';

function loadComponent(props) {
  // brake these into there own "views"
  switch (props.match.path) {
    case '/add/deck':
      return <NewDeckForm {...props} />;
    case '/edit/card/:cardId':
      return <EditCardForm {...props} />;
    case '/add/card':
      return <NewCardForm {...props} />;
    default:
      return <Redirect to="/" />;
  }
}

function AddEditView(props) {
  return <Layout>{loadComponent(props)}</Layout>;
}

export default AddEditView;
