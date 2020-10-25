import React, { useState } from 'react';
import FlashcardFrom from './FlashcardForm';
import { DeckNameReadOnly } from './DeckNameInputs';
import { useFlashcardContext } from '../../Views/flashcardView-context';
import { useFlashcardEdit } from '../../utils/client';

export default function EditCard({ editFlashcard }) {
  const { deckName, flashcard } = useFlashcardContext();
  const [updateCardInDb] = useFlashcardEdit();
  const [formValue, setFormValue] = useState({
    deckName,
    frontOfCard: flashcard.front,
    backOfCard: flashcard.back,
    cardImage: flashcard.image
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCard = {
      card: {
        front: formValue.frontOfCard,
        back: formValue.backOfCard,
        image: formValue.cardImage
      },
      cardId: flashcard.id,
      deckId: flashcard.deckId
    };
    updateCardInDb(newCard, {
      onSuccess(data) {
        editFlashcard(data);
      }
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
