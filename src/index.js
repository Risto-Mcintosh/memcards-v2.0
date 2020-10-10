import React from 'react';
import ReactDOM from 'react-dom';
import './custom.scss';
import App from './App';
import { makeServer } from './server';
import AppProviders from './context';

if (process.env.NODE_ENV === 'development') {
  makeServer({ environment: 'development' });
}

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById('root')
);
