import React from 'react';
import { createBrowserHistory } from 'history';
import { ReactQueryConfigProvider } from 'react-query';
import { Router } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import { AuthProvider } from '../context/auth-context';
import { localStorageKey } from 'service/auth';

afterEach(cleanup);

function renderWithRouter(ui, { route = '/', user } = {}) {
  const history = createBrowserHistory();
  history.push(route);
  user = loginWithUser(user);
  return {
    ...render(
      <ReactQueryConfigProvider
        config={{ queries: { refetchOnWindowFocus: false } }}
      >
        <AuthProvider>
          <Router history={history}>{ui}</Router>
        </AuthProvider>
      </ReactQueryConfigProvider>
    ),
    history,
    user
  };
}

function loginWithUser(user) {
  if (!user) throw `Pass in a user to login. Called with ${user}`;
  window.localStorage.setItem(localStorageKey, user);
  return user;
}
export default renderWithRouter;
