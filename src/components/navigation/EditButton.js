import React from 'react';
import { Nav } from 'react-bootstrap';
import { Edit } from '@styled-icons/material/Edit';
import { useFlashcardContext } from '../../Views/flashcardView-context';

export default function EditButton() {
  const { editFlashcard } = useFlashcardContext();
  return (
    <Nav.Link
      className="text-white mr-2 p-0 bg-transparent border-0"
      as="button"
      data-testid="edit-button"
      onClick={() => editFlashcard()}
    >
      <Edit style={{ width: '30px' }} />
    </Nav.Link>
  );
}
