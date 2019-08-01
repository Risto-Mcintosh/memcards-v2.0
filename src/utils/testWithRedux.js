import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, cleanup } from '@testing-library/react';
import history from '../history';
import appReducer from '../reducers/index';
import { initialState } from '../store';

afterEach(cleanup);

const rootReducer = (state, action) => {
  if (action.type === 'HYDRATE') {
    state.decks = initialState;
  }
  return appReducer(state, action);
};

function testWithRedux(ui, { store = createStore(rootReducer) } = {}) {
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{ui}</Router>
      </Provider>
    ),
    store
  };
}

export default testWithRedux;
