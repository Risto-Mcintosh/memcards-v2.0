import React from 'react';
import renderWithRouter from 'test/testWithRouter';
import App from '../App';
import {
  prettyDOM,
  waitForElementToBeRemoved,
  waitFor,
  cleanup
} from '@testing-library/react';
import { makeServer } from '../server';
import userEvent from '@testing-library/user-event';

let server;

beforeEach(() => {
  server = makeServer();
});

afterEach(() => {
  server.shutdown();
  cleanup();
});

function render({ deckCount } = {}) {
  const user = server.create('user');
  if (deckCount) {
    server.createList('deck', deckCount, { user });
  } else {
    server.create('deck', { user });
  }

  const utils = renderWithRouter(<App />, {
    user: user.id
  });

  return {
    ...utils
  };
}

it('should load with 5 test decks', async () => {
  const { getAllByTestId, getByTestId, container } = render({ deckCount: 5 });
  await waitForElementToBeRemoved(() => getByTestId('loading'));
  await waitFor(() => getAllByTestId('test-deck'));
  const decks = getAllByTestId('test-deck');
  expect(decks.length).toBe(5);
});

it('deck with no flashcards should be disable', async () => {
  const { getByTestId } = render();
  await waitForElementToBeRemoved(() => getByTestId('loading'));
  await waitFor(() => getByTestId('test-deck'));

  expect(getByTestId('test-deck')).toHaveClass('disabled');
});

it('should delete deck', async () => {
  const { getByTestId, container } = render();
  await waitForElementToBeRemoved(() => getByTestId('loading'));
  await waitFor(() => getByTestId('test-deck'));

  const testDeck = getByTestId('test-deck');
  userEvent.click(getByTestId('delete-button'));
  userEvent.click(getByTestId('delete-deck'));
  await waitFor(() => expect(testDeck).not.toBeInTheDocument());
});
