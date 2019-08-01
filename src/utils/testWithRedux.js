import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, cleanup } from '@testing-library/react';
import history from '../history';
import appReducer from '../reducers/index';

afterEach(cleanup);

export const state = {
  decks: [
    {
      name: 'Test Images Flashcards',
      editable: false,
      data: [
        {
          front: 'CSS',
          image: {
            src:
              'https://images.unsplash.com/photo-1550029330-8dbccaade873?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjc0NDk5fQ',
            alt: 'some text'
          },
          back: 'Cascading Style Sheets'
        }
      ]
    }
  ],
  deck: {
    name: 'Test Images Flashcards',
    editable: false,
    data: [
      {
        front: 'CSS',
        image: {
          src:
            'https://images.unsplash.com/photo-1550029330-8dbccaade873?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjc0NDk5fQ',
          alt: 'some text'
        },
        back: 'Cascading Style Sheets'
      }
    ]
  },
  card: {
    front: 'CSS',
    image: {
      src:
        'https://images.unsplash.com/photo-1550029330-8dbccaade873?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjc0NDk5fQ',
      alt: 'some text'
    },
    back: 'Cascading Style Sheets'
  }
};

// const rootReducer = (state, action) => {
//   if (action.type === 'HYDRATE') {
//     state.decks = initialState;
//   }
//   return appReducer(state, action);
// };

function testWithRedux(
  ui,
  { initialState, store = createStore(appReducer, initialState) } = {}
) {
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
