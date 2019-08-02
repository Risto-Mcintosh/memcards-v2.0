import React from 'react';
import { Delete } from 'styled-icons/material/Delete';
import { Nav } from 'react-bootstrap';

export default function deleteButton({
  match,
  editableDecks,
  deck,
  card,
  deleteDeckToggle,
  deleteCard
}) {
  if ((match.path === '/decks' || match.path === '/') && editableDecks) {
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
  if (match.path === '/deck/:deckName' && deck.editable) {
    return (
      <Nav.Link
        className="text-white mr-2 p-0 bg-transparent border-0"
        as="button"
      >
        <Delete
          onClick={() => deleteCard(deck, card.id)}
          style={{ width: '30px' }}
        />
      </Nav.Link>
    );
  }
  return null;
}
