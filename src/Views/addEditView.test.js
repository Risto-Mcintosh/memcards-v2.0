import React from 'react';
import renderWithRedux from '../utils/testWithRedux';
import App from '../App';
import {
  prettyDOM,
  waitForElementToBeRemoved,
  waitForElement,
  fireEvent
} from '@testing-library/react';
import { makeServer } from '../server';
import userEvent from '@testing-library/user-event';

let server;

beforeEach(() => {
  server = makeServer();
});

afterEach(() => {
  server.shutdown();
});

it('should add new deck to DB and navigate to "Add New Card" page', async () => {
  const { getByTestId, getByLabelText, history, container } = renderWithRedux(
    <App />,
    {
      route: '/add/newdeck'
    }
  );
  // await waitForElementToBeRemoved(() => getByTestId('loading'), {
  //   timeout: 10000
  // })
  const deckNameInput = getByLabelText(/deck/i);
  const cardFrontInput = getByLabelText(/Front/i);
  const cardBackInput = getByLabelText(/Back/i);

  userEvent.type(deckNameInput, 'Test Deck');
  userEvent.type(cardFrontInput, 'front text');
  userEvent.type(cardBackInput, 'back text');
  fireEvent.submit(container.querySelector('form'));
  await waitForElementToBeRemoved(() => getByTestId('deck-name-input'));

  expect(server.db.decks.length).toBe(1);
  expect(history.location.pathname).toContain('add/card');
});
