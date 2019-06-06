import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import DeckNameInput from "./DeckNameInput";
import FormHeading from "./FormHeading";
import SnackBar from "../SnackBar";
import ImageInput from "./imageInput";
import ImageSearch from "../imageSearch";

export default function AddEditCard(props) {
  let deckName = !props.location.state
    ? ""
    : props.location.state.selectedDeckName;
  let frontOfCard = !props.match.params.cardId ? "" : props.card.front;
  let backOfCard = !props.match.params.cardId ? "" : props.card.back;

  const [formValue, setFormValue] = useState({
    deckName,
    frontOfCard,
    backOfCard
  });

  const [snackBar, setSnackBar] = useState({
    show: !props.location.state
      ? false
      : props.location.state.snackBar
      ? true
      : false,
    message: !props.location.state
      ? ""
      : props.location.state.snackBar
      ? "New Deck Created!"
      : ""
  });

  const handleSubmit = e => {
    e.preventDefault();

    if (props.location.pathname === "/add/newdeck") {
      props.createDeck(formValue);
    } else if (props.match.path === "/edit/card/:cardId") {
      props.updateCard(props.deck.id, formValue, props.card.id);
    } else {
      props.addNewCard(formValue);
      setSnackBar({ show: true, message: "New Card Added!" });
    }

    setFormValue({
      deckName: formValue.deckName,
      frontOfCard: "",
      backOfCard: ""
    });
  };

  const handleChange = e => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-100 h-100 position-relative">
      <Container className="d-flex flex-column align-items-center p-1 pt-3">
        <FormHeading url={props.match.url} />
        <div className="col-11 p-0 d-flex justify-content-center align-items-center align-items-md-start">
          <Form
            className="col-9 col-md-7 col-lg-6 p-0 pt-md-5"
            onSubmit={handleSubmit}
          >
            <Form.Group controlId="editDeckname">
              <Form.Label>Deck Name:</Form.Label>
              <DeckNameInput
                value={formValue.deckName}
                handleChange={handleChange}
                url={props.match}
                decks={props.decks}
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
              <ImageInput />
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
            <Button className="col-12" variant="secondary" type="submit">
              Submit
            </Button>
            <SnackBar
              showState={snackBar.show}
              message={snackBar.message}
              setSnackBar={setSnackBar}
            />
          </Form>
        </div>
      </Container>
      <ImageSearch />
    </div>
  );
}
