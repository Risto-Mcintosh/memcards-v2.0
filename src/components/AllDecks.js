import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { Delete } from '@styled-icons/material/Delete';
import { Link } from 'react-router-dom';
import AddNewButtons from './AddNewButtons';
import { useDeckDelete } from '../utils/useClient';
import { useDecksViewContext } from '../Views/allDecksView-context';

export default function AllDecks({ decks }) {
  const [deleteDeck] = useDeckDelete();
  const { showDeckDelete } = useDecksViewContext();
  return (
    <Container className="d-flex flex-column position-relative">
      <ListGroup variant="flush" className="mt-3" data-testid="deck-list">
        {decks.map((deck) => (
          <ListGroup.Item
            data-testid="test-deck"
            as={Link}
            to={{
              pathname: `/decks/${deck.id}`,
              state: { deckName: deck.name }
            }}
            key={deck.id}
            action
            className={`d-flex justify-content-between ${
              deck.cardCount <= 0 ? 'text-muted' : null
            }`}
            disabled={deck.cardCount <= 0 ? true : false}
          >
            <div className="d-flex align-items-center">
              {showDeckDelete && (
                <Delete
                  data-testid="delete-deck"
                  className="text-danger"
                  style={{ width: '30px', pointerEvents: 'auto' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    deleteDeck(deck.id);
                  }}
                />
              )}
              <div className="h5">{deck.name}</div>
            </div>
            <div className=" font-weight-bold">{deck.cardCount}</div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <AddNewButtons />
    </Container>
  );
}
