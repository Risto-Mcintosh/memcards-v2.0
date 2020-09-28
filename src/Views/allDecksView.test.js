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

it('should load with 5 test decks', async () => {
  const server = makeServer();
  server.createList('deck', 5);
  const { getAllByTestId, getByTestId } = renderWithRedux(<App />);
  await waitForElementToBeRemoved(() => getByTestId('loading'));
  const decks = getAllByTestId('test-deck');
  expect(decks.length).toBe(5);
  server.shutdown();
});
