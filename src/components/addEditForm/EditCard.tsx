import React, { useState } from 'react';
import { FormValues } from './addEditForm.types';
import FlashcardFrom from './FlashcardForm';
import { DeckNameReadOnly } from './DeckNameInputs';

export default function EditCard({ updateCard, location, card, deck }) {
  const deckName = location.state.selectedDeckName;
  const frontOfCard = card.front;
  const backOfCard = card.back;
  const cardImage = card.image;

  const [formValue, setFormValue] = useState<FormValues | null>({
    deckName,
    frontOfCard,
    backOfCard,
    cardImage
  });

  const handleSubmit = e => {
    e.preventDefault();
    updateCard(deck.id, formValue, card.id);
    setFormValue({
      deckName: formValue.deckName,
      frontOfCard: '',
      backOfCard: '',
      cardImage: null
    });
  };

  const handleChange = e => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  return (
    <FlashcardFrom
      formHeading="Add New Card"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      DeckNameInput={<DeckNameReadOnly value={formValue.deckName} />}
      formValue={formValue}
      setFormValue={setFormValue}
    />
  );
}
