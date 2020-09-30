import React from 'react';
import renderWithRedux from '../utils/testWithRedux';
import App from '../App';
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
  prettyDOM
} from '@testing-library/react';
import { makeServer } from '../server';
import userEvent from '@testing-library/user-event';

it('should redirect to home page when all cards are deleted from deck', async () => {
  const server = makeServer();
  server
    .create('deck')
    .update({ data: server.createList('flashcard', 2), cardCount: 2 });
  const { getByTestId, history } = renderWithRedux(<App />);
  await waitForElementToBeRemoved(() => getByTestId('loading'));
  userEvent.click(getByTestId('test-deck'));
  await waitForElementToBeRemoved(() => getByTestId('loading'));
  userEvent.click(getByTestId('delete-button'));
  userEvent.click(getByTestId('delete-button'));
  await waitFor(() => screen.getByTestId('deck-list'));
  expect(history.location.pathname).toBe('/decks');
  expect(getByTestId('test-deck')).toHaveClass('disabled');
  server.shutdown();
});

it('should show Completed page', async () => {
  const server = makeServer();
  server
    .create('deck')
    .update({ data: server.createList('flashcard', 2), cardCount: 2 });
  const { getByTestId, history } = renderWithRedux(<App />);
  await waitForElementToBeRemoved(() => getByTestId('loading'));
  userEvent.click(getByTestId('test-deck'));
  await waitForElementToBeRemoved(() => getByTestId('loading'));
  userEvent.click(getByTestId('flip-card'));
  userEvent.click(getByTestId('flip-card'));
  userEvent.click(getByTestId('flip-card'));
  userEvent.click(getByTestId('flip-card'));
  await waitFor(() =>
    expect(screen.getByTestId('deck-complete')).toBeInTheDocument()
  );

  expect(history.location.pathname).toBe('/completed');
  server.shutdown();
});

it.skip('should successfully edit a flashcard', async () => {
  const server = makeServer();
  server
    .create('deck')
    .update({ data: server.createList('flashcard', 1), cardCount: 1 });
  const { history } = renderWithRedux(<App />);
  await waitForElementToBeRemoved(() => getByTestId('loading'));
  userEvent.click(getByTestId('test-deck'));
  await waitForElementToBeRemoved(() => getByTestId('loading'));
  userEvent.click(getByTestId('edit-button'));
  server.shutdown();
});
