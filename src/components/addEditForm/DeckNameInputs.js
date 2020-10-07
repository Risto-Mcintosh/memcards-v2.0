import React from 'react';
import { Form } from 'react-bootstrap';

export const DeckNameInput = ({ handleChange, value }) => (
  <Form.Control
    required
    value={value}
    name="deckName"
    type="text"
    data-testid="deck-name-input"
    placeholder="Deck Name"
    onChange={handleChange}
  />
);

export const DeckNameReadOnly = ({ value }) => (
  <Form.Control
    plaintext
    readOnly
    className="border-bottom"
    value={value}
    name="deckName"
  />
);

export const DeckSelectInput = ({ handleChange, value, deckList = [] }) => {
  return (
    <Form.Control
      as="select"
      required
      value={value}
      name="deckName"
      type="text"
      placeholder="Deck Name"
      onChange={handleChange}
      data-testid="deck-name-select"
    >
      <option />
      {deckList.map((deck) => (
        <option value={deck.name} key={deck.id} data-deckid={deck.id}>
          {deck.name}
        </option>
      ))}
    </Form.Control>
  );
};
