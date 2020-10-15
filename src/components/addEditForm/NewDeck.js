import React, { useState } from 'react';
import FlashcardFrom from './FlashcardForm';
import { DeckNameInput } from './DeckNameInputs';
import { useDeckCreate } from '../../utils/client';
import { useHistory } from 'react-router-dom';

export default function NewDeckForm() {
  const [createDeck] = useDeckCreate();
  const history = useHistory();
  const [formValue, setFormValue] = useState({
    deckName: '',
    frontOfCard: '',
    backOfCard: '',
    cardImage: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createDeck(
      {
        deckName: formValue.deckName,
        card: {
          front: formValue.frontOfCard,
          image: formValue.cardImage,
          back: formValue.backOfCard
        }
      },
      {
        onSuccess(deckId) {
          history.push('/add/card', {
            selectedDeck: { name: formValue.deckName, id: deckId },
            snackBar: { show: true, message: 'New Deck Created!' }
          });
        }
      }
    );
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
