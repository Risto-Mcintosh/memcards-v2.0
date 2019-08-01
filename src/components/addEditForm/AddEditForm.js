/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Form, Button } from 'react-bootstrap';
import DeckNameInput from './DeckNameInput';
import FormHeading from './FormHeading';
import SnackBar from '../SnackBar';
import ImageInput from './ImageInput';
import ImageSearch from '../imagesearch/ImageSearch';

export default function AddEditCard({
  location,
  match,
  decks,
  deck,
  card,
  createDeck,
  updateCard,
  addNewCard
}) {
  let deckName;
  let frontOfCard;
  let backOfCard;
  let cardImage;
  let showSnackBar;
  let snackBarMessage;

  if (!location.state) {
    deckName = '';
    showSnackBar = false;
    snackBarMessage = '';
  } else if (location.state.snackBar) {
    showSnackBar = location.state.snackBar.show;
    snackBarMessage = location.state.snackBar.message;
    deckName = location.state.selectedDeckName;
  } else {
    deckName = location.state.selectedDeckName;
  }

  if (!match.params.cardId) {
    frontOfCard = '';
    backOfCard = '';
    cardImage = null;
  } else {
    frontOfCard = card.front;
    backOfCard = card.back;
    cardImage = card.image;
  }

  const [formValue, setFormValue] = useState({
    deckName,
    frontOfCard,
    backOfCard,
    cardImage
  });

  const [searchToggle, setToggle] = useState(false);

  const [snackBar, setSnackBar] = useState({
    show: showSnackBar,
    message: snackBarMessage
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (location.pathname === '/add/newdeck') {
      createDeck(formValue);
    } else if (match.path === '/edit/card/:cardId') {
      updateCard(deck.id, formValue, card.id);
    } else {
      addNewCard(formValue);
      setSnackBar({ show: true, message: 'New Card Added!' });
    }

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
    <div className="w-100 h-100 position-relative">
      <Container className="d-flex flex-column align-items-center p-1 pt-3">
        <FormHeading url={match.url} />
        <div className="col-11 p-0 d-flex justify-content-center align-items-center align-items-md-start">
          <Form
            className="col-9 col-md-7 col-lg-6 p-0 pt-md-5"
            onSubmit={handleSubmit}
          >
            <Form.Group controlId="editDeckName">
              <Form.Label>Deck Name:</Form.Label>
              <DeckNameInput
                value={formValue.deckName}
                handleChange={handleChange}
                url={match}
                decks={decks}
              />
            </Form.Group>
            <Form.Group controlId="frontOfFlashcard">
              <Form.Label>Front:</Form.Label>
              <Form.Control
                required
                name="frontOfCard"
                value={formValue.frontOfCard}
                type="text"
                placeholder="front of card"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="selectImage">
              <Form.Label>Image:</Form.Label>
              <ImageInput
                searchToggle={searchToggle}
                setToggle={setToggle}
                image={formValue.cardImage}
              />
            </Form.Group>
            <Form.Group controlId="BackOfFlashcard">
              <Form.Label>Back:</Form.Label>
              <Form.Control
                required
                name="backOfCard"
                value={formValue.backOfCard}
                type="text"
                placeholder="Back of card"
                onChange={handleChange}
              />
            </Form.Group>
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            <Button className="col-12" variant="secondary" type="submit">
              Submit
            </Button>
          </Form>
          <SnackBar
            showState={snackBar.show}
            message={snackBar.message}
            setSnackBar={setSnackBar}
          />
        </div>
      </Container>
      <ImageSearch
        searchToggle={searchToggle}
        setToggle={setToggle}
        formValue={formValue}
        setFormValue={setFormValue}
      />
    </div>
  );
}

AddEditCard.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
  decks: PropTypes.arrayOf(PropTypes.object),
  deck: PropTypes.object,
  card: PropTypes.object,
  createDeck: PropTypes.func.isRequired,
  updateCard: PropTypes.func.isRequired,
  addNewCard: PropTypes.func.isRequired
};

AddEditCard.defaultProps = {
  location: {},
  match: {},
  decks: {},
  deck: {},
  card: {}
};
