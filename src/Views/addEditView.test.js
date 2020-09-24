import React from 'react';
import AddEditView from './addEditView';
import renderWithRedux from '../utils/testWithRedux';
import App from '../App';
import {
  render,
  prettyDOM,
  waitForElementToBeRemoved,
  waitFor,
  screen
} from '@testing-library/react';
import { makeServer } from '../server';

const props = {
  match: {
    path: ''
  },
  location: {
    state: undefined
  }
};

let server;

beforeEach(() => {
  server = makeServer();
  server.create('deck', {
    name: 'Test 1',
    editable: true,
    data: server.createList('flashcard', 5),
    cardCount: 5
  });
});

afterEach(() => {
  server.shutdown();
});

it.only('should render the create new deck form', async () => {
  const { container, getByTestId, getByText } = renderWithRedux(<App />);
  await waitForElementToBeRemoved(() => getByTestId('loading'), {
    timeout: 10000
  });
  console.log(prettyDOM(container));
});

it('should render the Create New Deck form ', () => {
  props.match.path = '/add/newdeck';
  const { getByTestId } = renderWithRedux(<AddEditView {...props} />);
  const fromHeading = 'Create New Deck';
  expect(getByTestId('form-heading')).toHaveTextContent(fromHeading);
});

it('should render the Edit Card form ', () => {
  props.match.path = '/add/card';
  const { getByTestId } = renderWithRedux(<AddEditView {...props} />);
  const fromHeading = 'Add New Card';
  expect(getByTestId('form-heading')).toHaveTextContent(fromHeading);
});

it('should show Snackbar ', () => {
  const message = 'new card created!';
  props.match.path = '/add/card';
  props.location.state = {
    snackBar: {
      show: true,
      message
    }
  };
  const { queryByText } = renderWithRedux(<AddEditView {...props} />);
  expect(queryByText(message)).toBeInTheDocument();
});
