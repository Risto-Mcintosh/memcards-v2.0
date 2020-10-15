import React from 'react';
import renderWithRouter from 'test/testWithRouter';
import App from '../App';
import {
  prettyDOM,
  waitForElementToBeRemoved,
  waitFor,
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

function render({ deckCount, ...options } = {}) {
  const user = server.create('user');
  if (deckCount) {
    server.createList('deck', deckCount, { user });
  } else {
    server.create('deck', { user });
  }

  const utils = renderWithRouter(<App />, {
    ...options,
    user: user.id
  });

  return {
    ...utils
  };
}
it('should add new deck to DB and navigate to "Add New Card" page', async () => {
  const { getByTestId, getByLabelText, history, container } = render({
    route: '/add/deck'
  });

  await waitForElementToBeRemoved(() => getByTestId('loading'));
  userEvent.type(getByLabelText(/deck/i), 'Test Deck');
  userEvent.type(getByLabelText(/Front/i), 'front text');
  userEvent.type(getByLabelText(/Back/i), 'back text');
  fireEvent.submit(container.querySelector('form'));
  await waitFor(() => expect(history.location.pathname).toContain('add/card'));

  expect(server.db.decks.length).toBe(2);
});

it('should add 1 new card to "Test Deck 1"', async () => {
  const { getByTestId, getByText, container, getByLabelText } = render({
    route: '/add/card'
  });
  await waitForElementToBeRemoved(() => getByTestId('loading'));

  userEvent.selectOptions(
    getByTestId('deck-name-select'),
    getByText(/test deck 1/i)
  );

  userEvent.type(getByLabelText(/Front/i), 'front text');
  userEvent.type(getByLabelText(/Back/i), 'back text');
  fireEvent.submit(container.querySelector('form'));
  await waitFor(() => expect(getByTestId('snackbar')).toBeInTheDocument());
});
