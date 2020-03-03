import { combineReducers } from 'redux';
import decks from './decks';
import deck from './deck';
import card from './card';
import user from './user';

const appReducer = combineReducers({
  decks,
  deck,
  card,
  user
});

export default appReducer;
