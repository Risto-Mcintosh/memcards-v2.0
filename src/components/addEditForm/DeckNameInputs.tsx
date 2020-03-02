import React from 'react';
import { Form } from 'react-bootstrap';

type Props = {
  handleChange?: (e: React.FormEvent) => void;
  value?: string;
  deckList?: any[];
};

export const DeckNameInput = ({ handleChange, value }: Props) => (
  <Form.Control
    required
    value={value}
    name="deckName"
    type="text"
    placeholder="Deck Name"
    onChange={handleChange}
  />
);

export const DeckNameReadOnly = ({ value }: Props) => (
  <Form.Control
    plaintext
    readOnly
    className="border-bottom"
    value={value}
    name="deckName"
  />
);

export const DeckSelectInput = ({
  handleChange,
  value,
  deckList = []
}: Props) => {
  return (
    <Form.Control
      as="select"
      required
      value={value}
      name="deckName"
      type="text"
      placeholder="Deck Name"
      onChange={handleChange}
    >
      <option />
      {deckList.map(deck => (
        <option value={deck.name} key={deck.id}>
          {deck.name}
        </option>
      ))}
    </Form.Control>
  );
};
