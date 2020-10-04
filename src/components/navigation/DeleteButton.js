import React from 'react';
import { Delete } from '@styled-icons/material/Delete';
import { Nav } from 'react-bootstrap';
import { useFlashcardDelete } from '../../utils/useClient';

export default function DeleteButton({ flashcard }) {
  const [deleteCard] = useFlashcardDelete();
  return (
    <Nav.Link
      className="text-white mr-2 p-0 bg-transparent border-0"
      as="button"
    >
      <Delete
        data-testid="delete-button"
        onClick={() => {
          deleteCard(flashcard);
        }}
        style={{ width: '30px' }}
      />
    </Nav.Link>
  );
}
