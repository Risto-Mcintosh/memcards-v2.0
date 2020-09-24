import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import spanish100 from './data/100spanish.json';
// import capitalCities from './data/capital_cities.json';
// import webDevAcronyms from './data/web_development_acronyms.json';
import appReducer from './reducers/index';
import { hydrate } from './actions/actionCreator';

// export const initialState = [spanish100, capitalCities, webDevAcronyms];

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

if (process.env.NODE_ENV !== 'test') {
  store.dispatch(hydrate());
}

export default store;
