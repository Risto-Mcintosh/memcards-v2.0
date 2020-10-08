import React from 'react';
import { Delete } from '@styled-icons/material/Delete';
import { Nav } from 'react-bootstrap';
import { useDecksViewContext } from '../../Views/allDecksView-context';

function DeleteToggle() {
  const { toggleDeckDelete } = useDecksViewContext();
  return (
    <Nav.Link
      className="text-white mr-2 p-0 bg-transparent border-0"
      as="button"
    >
      <Delete
        data-testid="delete-button"
        onClick={() => toggleDeckDelete((s) => !s)}
        style={{ width: '30px' }}
      />
    </Nav.Link>
  );
}

export default DeleteToggle;
