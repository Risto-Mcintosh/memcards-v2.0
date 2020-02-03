import React from 'react';
import AddEditView from './addEditView';
import renderWithRedux from '../utils/testWithRedux';
import { render } from '@testing-library/react';
import { createDeck, addNewCard, updateCard } from '../actions/actionCreator';

jest.mock('../actions/actionCreator', () => ({
  createDeck: jest.fn(),
  updateCard: jest.fn(),
  addNewCard: jest.fn()
}));

const props = {
  match: {
    path: ''
  },
  location: {
    state: undefined
  }
};

it('should render the Create New Deck form ', () => {
  props.match.path = '/add/newdeck';
  const { getByTestId } = renderWithRedux(<AddEditView {...props} />);
  const fromHeading = 'Create New Deck';
  expect(getByTestId('form-heading')).toHaveTextContent(fromHeading);
});

it('should render the Edit Card form ', () => {
  props.match.path = '/add/card';
  const { getByTestId } = renderWithRedux(<AddEditView {...props} />);
  const fromHeading = 'Edit Card';
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
