import React from 'react';
import { Delete } from '@styled-icons/material/Delete';
import { Nav } from 'react-bootstrap';
import { useFlashcardDelete } from '../../utils/client';
import { useFlashcardContext } from '../../Views/flashcardView-context';

export default function DeleteButton() {
  const { flashcard, clearCard } = useFlashcardContext();
  const [deleteCard] = useFlashcardDelete();
  function handleDelete() {
    clearCard();

    deleteCard(flashcard);
  }
  return (
    <Nav.Link
      className="text-white mr-2 p-0 bg-transparent border-0"
      as="button"
    >
      <Delete
        data-testid="delete-button"
        onClick={handleDelete}
        style={{ width: '30px' }}
      />
    </Nav.Link>
  );
}
