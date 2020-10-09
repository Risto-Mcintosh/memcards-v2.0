import React from 'react';
import renderWithRedux from '../utils/testWithRedux';
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

it('should load with 5 test decks', async () => {
  server.createList('deck', 5);
  const { getAllByTestId, getByTestId, container } = renderWithRedux(<App />);
  await waitForElementToBeRemoved(() => getByTestId('loading'));
  // await waitFor(() => getAllByTestId('test-deck'));
  const decks = getAllByTestId('test-deck');
  expect(decks.length).toBe(5);
});

it('deck with no flashcards should be disable', async () => {
  server.create('deck');
  const { getByTestId } = renderWithRedux(<App />);
  await waitForElementToBeRemoved(() => getByTestId('loading'));
  expect(getByTestId('test-deck')).toHaveClass('disabled');
});

it('should delete deck', async () => {
  server.create('deck');
  const { getByTestId, container } = renderWithRedux(<App />);
  await waitForElementToBeRemoved(() => getByTestId('loading'));
  const testDeck = getByTestId('test-deck');
  userEvent.click(getByTestId('delete-button'));
  userEvent.click(getByTestId('delete-deck'));
  await waitFor(() => expect(testDeck).not.toBeInTheDocument());
});
