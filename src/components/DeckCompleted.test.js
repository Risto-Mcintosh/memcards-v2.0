import React from 'react';
import { cleanup } from '@testing-library/react';
import { DeckCompleted } from './DeckCompleted';
import '@testing-library/jest-dom/extend-expect';
import testWithRedux from '../utils/testWithRedux';

afterEach(cleanup);

it('should display the deckName prop in a <h2>', () => {
  const deckName = 'Test Deck';
  const { container } = testWithRedux(<DeckCompleted deckName={deckName} />);
  const h2 = container.querySelector('h2').innerHTML;
  expect(h2).toContain(deckName);
});
