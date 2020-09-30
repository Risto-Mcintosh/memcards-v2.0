/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Delete } from '@styled-icons/material/Delete';
import { Nav } from 'react-bootstrap';

export default function deleteButton({
  match,
  deck,
  card,
  deleteDeckToggle,
  deleteCard,
  getCard
}) {
  if (match.path === '/decks' || match.path === '/') {
    return (
      <Nav.Link
        className="text-white mr-2 p-0 bg-transparent border-0"
        as="button"
      >
        <Delete
          onClick={() => deleteDeckToggle(deck.toggleDelete)}
          style={{ width: '30px' }}
        />
      </Nav.Link>
    );
  }
  if (match.path === '/deck/:deckName') {
    return (
      <Nav.Link
        className="text-white mr-2 p-0 bg-transparent border-0"
        as="button"
      >
        <Delete
          data-testid="delete-button"
          onClick={() => {
            deleteCard(deck, card.id);
            getCard('random');
          }}
          style={{ width: '30px' }}
        />
      </Nav.Link>
    );
  }
  return null;
}

deleteButton.propTypes = {
  match: PropTypes.object,
  deck: PropTypes.object,
  card: PropTypes.object,
  deleteDeckToggle: PropTypes.func,
  deleteCard: PropTypes.func,
  getCard: PropTypes.func
};
