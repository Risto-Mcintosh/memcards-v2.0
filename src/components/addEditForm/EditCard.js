import React, { useState } from 'react';
import FlashcardFrom from './FlashcardForm';
import { DeckNameReadOnly } from './DeckNameInputs';
import { useFlashcardContext } from '../../Views/flashcardView-context';
import { useFlashcardEdit } from '../../utils/useClient';

export default function EditCard({ getCard }) {
  const { deckName, flashcard } = useFlashcardContext();
  const [updateCard] = useFlashcardEdit();

  const [formValue, setFormValue] = useState({
    deckName,
    frontOfCard: flashcard.front,
    backOfCard: flashcard.back,
    cardImage: flashcard.image
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCard = {
      id: flashcard.id,
      front: formValue.frontOfCard,
      back: formValue.backOfCard,
      image: formValue.cardImage,
      deckId: flashcard.deckId
    };

    updateCard(newCard);

    getCard({ ...newCard, edited: true });
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
