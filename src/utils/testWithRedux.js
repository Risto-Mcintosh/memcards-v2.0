import React from 'react';
import { Provider } from 'react-redux';
import history from '../history';
import { Router } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import store from '../store';
import { hydrate } from '../actions/actionCreator';

afterEach(cleanup);

function testWithRedux(ui, { route } = { route: '' }) {
  store.dispatch(hydrate());
  if (route) {
    history.push(route);
  }

  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{ui}</Router>
      </Provider>
    ),
    store,
    history
  };
}

export default testWithRedux;
