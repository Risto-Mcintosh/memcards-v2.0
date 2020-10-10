import React from 'react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import { AuthProvider } from '../context/auth-context';

afterEach(cleanup);

function renderWithRouter(ui, { route } = { route: '/' }) {
  const history = createBrowserHistory();
  history.push(route);

  return {
    ...render(
      <AuthProvider>
        <Router history={history}>{ui}</Router>
      </AuthProvider>
    ),
    history
  };
}

export default renderWithRouter;
