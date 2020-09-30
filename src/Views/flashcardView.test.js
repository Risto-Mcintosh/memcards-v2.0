import React from 'react';
import renderWithRedux from '../utils/testWithRedux';
import App from '../App';
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
  prettyDOM,
  fireEvent,
  cleanup
} from '@testing-library/react';
import { makeServer } from '../server';
import userEvent from '@testing-library/user-event';

afterEach(cleanup);
it('should redirect to home page when all cards are deleted from deck', async () => {
  const server = makeServer();
  server
    .create('deck')
    .update({ data: server.createList('flashcard', 2), cardCount: 2 });
  const { history } = renderWithRedux(<App />);
  await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
  userEvent.click(screen.getByTestId('test-deck'));
  await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
  userEvent.click(screen.getByTestId('delete-button'));
  userEvent.click(screen.getByTestId('delete-button'));
  await waitFor(() => screen.getByTestId('deck-list'));

  expect(history.location.pathname).toBe('/decks');
  expect(screen.getByTestId('test-deck')).toHaveClass('disabled');
  server.shutdown();
});

it('should show Completed page', async () => {
  const server = makeServer();
  server
    .create('deck')
    .update({ data: server.createList('flashcard', 2), cardCount: 2 });
  const { history } = renderWithRedux(<App />);
  await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
  userEvent.click(screen.getByTestId('test-deck'));
  await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
  userEvent.click(screen.getByTestId('flip-card'));
  userEvent.click(screen.getByTestId('flip-card'));
  userEvent.click(screen.getByTestId('flip-card'));
  userEvent.click(screen.getByTestId('flip-card'));

  await waitFor(() =>
    expect(screen.getByTestId('deck-complete')).toBeInTheDocument()
  );
  expect(history.location.pathname).toBe('/completed');
  server.shutdown();
});

it.only('should successfully edit a flashcard', async () => {
  const server = makeServer();
  server
    .create('deck')
    .update({ data: server.createList('flashcard', 1), cardCount: 1 });
  const { history, container } = renderWithRedux(<App />);

  await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
  userEvent.click(screen.getByTestId('test-deck'));
  await waitForElementToBeRemoved(() => screen.getByTestId('loading'));

  userEvent.click(screen.getByTestId('edit-button'));
  userEvent.type(screen.getByLabelText(/front/i), 'updated front text');
  userEvent.type(screen.getByLabelText(/back/i), 'updated back text');
  fireEvent.submit(container.querySelector('form'));
  await waitFor(() => screen.getAllByTestId('flashcard'));
  const flashcard = screen.getAllByTestId('flashcard');
  const flashcardFront = flashcard[0];
  const flashcardBack = flashcard[1];

  expect(flashcardFront).toHaveTextContent('updated front text');
  expect(flashcardBack).toHaveTextContent('updated back text');

  server.shutdown();
});
