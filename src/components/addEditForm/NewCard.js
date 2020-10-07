import React, { useState } from 'react';
import FlashcardFrom from './FlashcardForm';
import { DeckSelectInput } from './DeckNameInputs';
import SnackBar from '../SnackBar';
import { useLocation } from 'react-router-dom';
import { useDeckList, useFlashcardCreate } from '../../utils/useClient';
import Loading from '../loading';

export default function NewCard() {
  const { data, isLoading } = useDeckList();
  const [addNewCard] = useFlashcardCreate();
  const location = useLocation();

  let deckName = '';
  let showSnackBar = false;
  let snackBarMessage;
  // Todo  need to add deckId in select input (data-deckid) when new deck is created
  if (location.state) {
    deckName = location.state.selectedDeckName;
    showSnackBar = location.state.snackBar.show;
    snackBarMessage = location.state.snackBar.message;
  }

  const [formValue, setFormValue] = useState({
    deckName,
    deckId: null,
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
    addNewCard({
      card: {
        front: formValue.frontOfCard,
        image: formValue.cardImage,
        back: formValue.backOfCard
      },
      deckId: formValue.deckId
    });
    setSnackBar({ show: true, message: 'New Card Added!' });
    setFormValue({
      deckName: formValue.deckName,
      frontOfCard: '',
      backOfCard: '',
      cardImage: null
    });
  };

  const handleChange = (e) => {
    const selectedIndex = e.target.options?.selectedIndex;

    if (selectedIndex) {
      const deckId = e.target.options[selectedIndex].dataset.deckid;
      setFormValue({
        ...formValue,
        [e.target.name]: e.target.value,
        deckId: deckId
      });
    } else {
      setFormValue({
        ...formValue,
        [e.target.name]: e.target.value
      });
    }
  };
  if (isLoading) return <Loading />;

  return (
    <FlashcardFrom
      formHeading="Add New Card"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      DeckNameInput={
        <DeckSelectInput
          handleChange={handleChange}
          value={formValue.deckName}
          deckList={data}
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
