import React from 'react';
import { Container, Dropdown, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddNewButtons from './AddNewButtons';
import { useDeckDelete } from '../utils/client';
import styled from 'styled-components';

const IconButton = styled.button`
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: normal;
  width: 1.5rem;
  height: 1.5rem;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const CustomToggle = React.forwardRef(({ onClick }, ref) => (
  <IconButton
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
        clipRule="evenodd"
      />
    </svg>
  </IconButton>
));

export default function AllDecks({ decks }) {
  const [deleteDeck] = useDeckDelete();
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
              <div className="h5 mb-0">{deck.name}</div>
            </div>

            <div className="d-flex align-items-center">
              <div className="font-weight-bold mr-1">{deck.cardCount}</div>
              <Dropdown>
                <Dropdown.Toggle id="deck options" as={CustomToggle} />
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => deleteDeck(deck.id)}>
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <AddNewButtons />
    </Container>
  );
}
