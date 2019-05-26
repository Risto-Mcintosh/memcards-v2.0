import React from "react";
import { Router, Route } from "react-router-dom";
import history from "./history";

import FlashcardView from "./Views/flashcardView";
import AddEditView from "./Views/addEditView";
import AllDecksView from "./Views/allDecksView";

const App = () => {
  return (
    <Router history={history}>
      <Route exact path="/" component={AllDecksView} />
      <Route exact path="/decks" component={AllDecksView} />
      <Route exact path="/deck/:deckName" component={FlashcardView} />
      <Route exact path="/add/newdeck" component={AddEditView} />
      <Route exact path="/add/card" component={AddEditView} />
      <Route exact path="/edit/card/:cardId" component={AddEditView} />
    </Router>
  );
};

export default App;
