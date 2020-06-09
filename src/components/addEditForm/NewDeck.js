import React, { useState } from 'react';
import FlashcardFrom from './FlashcardForm';
import { DeckNameInput } from './DeckNameInputs';

export default function NewDeckForm({ createDeck }) {
  const [formValue, setFormValue] = useState({
    deckName: '',
    frontOfCard: '',
    backOfCard: '',
    cardImage: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createDeck(formValue);
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
      formHeading="Create New Deck"
      subheading="Name your new deck and create your first flashcard!"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      DeckNameInput={
        <DeckNameInput handleChange={handleChange} value={formValue.deckName} />
      }
      formValue={formValue}
      setFormValue={setFormValue}
    />
  );
}
