import React from 'react';
import renderWithRouter from 'test/testWithRouter';
import App from '../App';
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
  prettyDOM,
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

it('should redirect to home page when all cards are deleted from deck', async () => {
  server
    .create('deck')
    .update({ data: server.createList('flashcard', 2), cardCount: 2 });
  const { history } = renderWithRouter(<App />);

  await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
  userEvent.click(screen.getByTestId('test-deck'));
  await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
  userEvent.click(screen.getByTestId('delete-button'));
  await waitFor(() => screen.getAllByTestId('flashcard'));
  userEvent.click(screen.getByTestId('delete-button'));
  // await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
  // await waitFor(() => screen.getByTestId('deck-list'));

  expect(history.location.pathname).toBe('/decks');
  waitFor(() =>
    expect(screen.getByTestId('test-deck')).toHaveClass('disabled')
  );
});

it('should show Completed page', async () => {
  server
    .create('deck')
    .update({ data: server.createList('flashcard', 2), cardCount: 2 });
  const { history, container } = renderWithRouter(<App />);
  await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
  userEvent.click(screen.getByTestId('test-deck'));
  await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
  userEvent.click(screen.getByTestId('flip-card'));
  userEvent.click(screen.getByTestId('flip-card'));
  await waitFor(() => screen.getAllByTestId('flashcard'));
  userEvent.click(screen.getByTestId('flip-card'));
  userEvent.click(screen.getByTestId('flip-card'));

  await waitFor(() =>
    expect(screen.getByTestId('deck-complete')).toBeInTheDocument()
  );
});

it('should successfully edit a flashcard', async () => {
  server
    .create('deck')
    .update({ data: server.createList('flashcard', 1), cardCount: 1 });
  const { history, container } = renderWithRouter(<App />);

  await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
  userEvent.click(screen.getByTestId('test-deck'));
  // await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
  await waitFor(() => screen.getAllByTestId('flashcard'));

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
});
