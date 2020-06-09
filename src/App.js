import React from "react";
import { Router, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import history from "./history";
import FlashcardView from "./Views/flashcardView";
import AddEditView from "./Views/addEditView";
import AllDecksView from "./Views/allDecksView";
import WelcomeView from "./Views/welcomeView";
import DeckCompleted from "./components/DeckCompleted";

const App = () => (
  <Router history={history}>
    <Route exact path="/login" component={WelcomeView} />
    <Route exact path="/register" component={WelcomeView} />
    <PrivateRoute exact path="/" component={AllDecksView} />
    <PrivateRoute exact path="/decks" component={AllDecksView} />
    <PrivateRoute exact path="/deck/:deckName" component={FlashcardView} />
    <PrivateRoute exact path="/completed" component={DeckCompleted} />
    <PrivateRoute exact path="/add/newdeck" component={AddEditView} />
    <PrivateRoute exact path="/add/card" component={AddEditView} />
    <PrivateRoute exact path="/edit/card/:cardId" component={AddEditView} />
  </Router>
);
export default App;
