import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup } from '@testing-library/react';
import store from '../store';
import { hydrate } from '../actions/actionCreator';

afterEach(cleanup);

function testWithRedux(ui) {
  store.dispatch(hydrate());
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  };
}

export default testWithRedux;
