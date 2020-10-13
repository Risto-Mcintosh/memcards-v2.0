import React from 'react';
import { Route } from 'react-router-dom';
import FlashcardView from './Views/flashcardView';
import AddEditView from './Views/addEditView';
import AllDecksView from './Views/allDecksView';

const AuthenticatedApp = () => (
  <>
    <Route exact path="/" component={AllDecksView} />
    <Route exact path="/decks" component={AllDecksView} />
    <Route exact path="/decks/:deckId" component={FlashcardView} />
    {/* TODO update this route to /add/deck */}
    <Route exact path="/add/newdeck" component={AddEditView} />
    <Route exact path="/add/card" component={AddEditView} />
    <Route exact path="/edit/card/:cardId" component={AddEditView} />
  </>
);
export default AuthenticatedApp;
