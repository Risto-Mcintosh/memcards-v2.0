import React, { useState } from 'react';
import FlashcardFrom from './FlashcardForm';
import { DeckSelectInput } from './DeckNameInputs';
import SnackBar from '../SnackBar';

export default function NewCard({ addNewCard, location, decks }) {
  let deckName = '';
  let showSnackBar = false;
  let snackBarMessage;

  if (location.state) {
    deckName = location.state.selectedDeckName;
    showSnackBar = location.state.snackBar.show;
    snackBarMessage = location.state.snackBar.message;
  }

  const [formValue, setFormValue] = useState({
    deckName,
    frontOfCard: '',
    backOfCard: '',
    cardImage: null
  });

  const [snackBar, setSnackBar] = useState({
    show: showSnackBar,
    message: snackBarMessage
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewCard(formValue);
    setSnackBar({ show: true, message: 'New Card Added!' });
    setFormValue({
      deckName: formValue.deckName,
      frontOfCard: '',
      backOfCard: '',
      cardImage: null
    });
  };

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  return (
    <FlashcardFrom
      formHeading="Add New Card"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      DeckNameInput={
        <DeckSelectInput
          handleChange={handleChange}
          value={formValue.deckName}
          deckList={decks}
        />
      }
      formValue={formValue}
      setFormValue={setFormValue}
      snackBar={
        <SnackBar
          showState={snackBar.show}
          message={snackBar.message}
          setSnackBar={setSnackBar}
        />
      }
    />
  );
}
