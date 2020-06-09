import React, { useState } from 'react';
import FlashcardFrom from './FlashcardForm';
import { DeckNameReadOnly } from './DeckNameInputs';

export default function EditCard({
  updateCard,
  getCard,
  location,
  card,
  deck
}) {
  const deckName = location.state.selectedDeckName;
  const frontOfCard = card.front;
  const backOfCard = card.back;
  const cardImage = card.image;

  const [formValue, setFormValue] = useState({
    deckName,
    frontOfCard,
    backOfCard,
    cardImage
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCard(deck.id, formValue, card.id);
    getCard({
      id: card.id,
      front: formValue.frontOfCard,
      back: formValue.backOfCard,
      image: formValue.cardImage
    });
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
      formHeading="Edit Card"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      DeckNameInput={<DeckNameReadOnly value={formValue.deckName} />}
      formValue={formValue}
      setFormValue={setFormValue}
    />
  );
}
