import React from 'react';
import { fireEvent, cleanup, wait } from '@testing-library/react';
import renderWithRedux from '../../utils/testWithRedux';
import AddEditForm from './AddEditForm';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);
const props = {
  location: {},
  match: { params: {} },
  decks: [],
  deck: {},
  card: {},
  createDeck: jest.fn(),
  updateCard: jest.fn(),
  addNewCard: jest.fn()
};

it('Should open and close ImageSearch component', async () => {
  const { queryByTestId, getByText } = renderWithRedux(
    <AddEditForm {...props} />
  );
  const openImageSearch = queryByTestId('image-search-toggle');
  const imageSearchContainer = queryByTestId('image-search-container');
  const closeImageSearch = getByText(/close/i);
  fireEvent.click(openImageSearch);
  await wait(() => expect(imageSearchContainer).not.toHaveStyle(
    'transform: scaleX(1) translateX(0px)'
  ));

  fireEvent.click(closeImageSearch);
  await wait(() => expect(imageSearchContainer).toHaveStyle(
    'transform: scaleX(0) translateX(800px)'
  ));
});

it("should have 'Create New Deck' as the heading ", () => {
  props.match.url = '/add/newdeck';
  const fromHeading = 'Create New Deck';
  const { getByTestId } = renderWithRedux(<AddEditForm {...props} />);

  expect(getByTestId('form-heading')).toHaveTextContent(fromHeading);
});

it("should have 'Add New Card' as the heading ", () => {
  props.match.url = '/add/card';
  const fromHeading = 'Add New Card';
  const { getByTestId } = renderWithRedux(<AddEditForm {...props} />);

  expect(getByTestId('form-heading')).toHaveTextContent(fromHeading);
});
