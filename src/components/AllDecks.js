import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { Delete } from 'styled-icons/material/Delete';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddNewButtons from './AddNewButtons';

export default function AllDecks({
  decks,
  setCurrentDeck,
  deck: toggle,
  deleteDeck,
  getCard
}) {
  return (
    <Container className="d-flex flex-column position-relative">
      <ListGroup variant="flush" className="mt-3">
        {decks.map(deck => (
          <ListGroup.Item
            as={Link}
            to={`/deck/${deck.name}`}
            key={deck.id}
            onClick={async e => {
              e.stopPropagation();
              await setCurrentDeck(deck);
              getCard('random');
            }}
            data-testid={deck.editable ? 'userMade' : 'preMade'}
            action
            className={`d-flex justify-content-between ${
              deck.data.length <= 0 ? 'text-muted' : null
            }`}
            style={{
              pointerEvents: `${deck.data.length <= 0 ? 'none' : 'auto'} `
            }}
          >
            <div className="d-flex align-items-center">
              {deck.editable && toggle.toggleDelete && (
                <Delete
                  className="text-danger"
                  style={{ width: '30px', pointerEvents: 'auto' }}
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    deleteDeck(deck.id);
                  }}
                />
              )}
              <div className="h5">{deck.name}</div>
            </div>
            <div className=" font-weight-bold">{deck.data.length}</div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <AddNewButtons
        userMadeDecks={decks.some(deck => deck.editable === true)}
      />
    </Container>
  );
}

AllDecks.propTypes = {
  decks: PropTypes.array.isRequired,
  setCurrentDeck: PropTypes.func.isRequired,
  getCard: PropTypes.func.isRequired,
  deck: PropTypes.object.isRequired,
  deleteDeck: PropTypes.func.isRequired
};
