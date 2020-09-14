import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './custom.scss';
import App from './App';
import { makeServer } from './server';
require('dotenv').config();

if (process.env.NODE_ENV === 'development') {
  makeServer({ environment: 'development' });
}
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
