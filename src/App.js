import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import FlashcardView from './Views/flashcardView';
import AddEditView from './Views/addEditView';
import AllDecksView from './Views/allDecksView';
import WelcomeView from './Views/welcomeView';

const App = () => (
  <>
    <Route exact path="/login" component={WelcomeView} />
    <Route exact path="/register" component={WelcomeView} />
    <PrivateRoute exact path="/" component={AllDecksView} />
    <PrivateRoute exact path="/decks" component={AllDecksView} />
    <PrivateRoute exact path="/decks/:deckId" component={FlashcardView} />
    {/* update this route to /add/deck */}
    <PrivateRoute exact path="/add/newdeck" component={AddEditView} />
    <PrivateRoute exact path="/add/card" component={AddEditView} />
    <PrivateRoute exact path="/edit/card/:cardId" component={AddEditView} />
  </>
);
export default App;
