import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import history from '../history';
import { Router } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import { rootReducer } from '../store';
import { hydrate } from '../actions/actionCreator';

afterEach(cleanup);

function testWithRedux(ui, { route } = { route: '' }) {
  const store = createStore(rootReducer, applyMiddleware(thunk));
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
