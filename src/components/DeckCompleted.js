/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import { setCurrentDeck, getCard } from '../actions/actionCreator';
import Layout from './Layout';

const Card = styled.div`
  height: 180px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

function DeckCompleted({ deckName, setCurrentDeck, getCard }) {
  return (
    <Layout>
      <Container className=" d-flex justify-content-center align-items-center ">
        <Card
          className="bg-light border shadow p-3"
          data-testid="deck-complete"
        >
          <h2 className="m-0">{deckName}</h2>
          <p className="mb-0">Congratulations! You have finished this deck.</p>
          <div className="w-100 d-flex justify-content-around">
            <Link
              className="btn btn-primary"
              to={`/deck/${deckName}`}
              onClick={async () => {
                await setCurrentDeck(deckName);
                getCard('random');
              }}
            >
              Study Again?
            </Link>
            <Link className="btn btn-secondary" to="/">
              Home
            </Link>
          </div>
        </Card>
      </Container>
    </Layout>
  );
}

export default connect((state) => ({ deckName: state.deck.name }), {
  setCurrentDeck,
  getCard
})(DeckCompleted);

DeckCompleted.propTypes = {
  deckName: PropTypes.string.isRequired,
  setCurrentDeck: PropTypes.func.isRequired,
  getCard: PropTypes.func.isRequired
};
