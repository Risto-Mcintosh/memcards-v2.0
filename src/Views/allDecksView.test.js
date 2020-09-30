import React from 'react';
import renderWithRedux from '../utils/testWithRedux';
import App from '../App';
import { waitForElementToBeRemoved } from '@testing-library/react';
import { makeServer } from '../server';

it('should load with 5 test decks', async () => {
  const server = makeServer();
  server.createList('deck', 5);
  const { getAllByTestId, getByTestId } = renderWithRedux(<App />);
  await waitForElementToBeRemoved(() => getByTestId('loading'));
  const decks = getAllByTestId('test-deck');
  expect(decks.length).toBe(5);
  server.shutdown();
});

it('deck with no flashcards should be disable', async () => {
  const server = makeServer();
  server.create('deck');
  const { getByTestId } = renderWithRedux(<App />);
  await waitForElementToBeRemoved(() => getByTestId('loading'));
  expect(getByTestId('test-deck')).toHaveClass('disabled');
  server.shutdown();
});
