import { combineReducers } from 'redux';

function decks(state = [], action) {
  switch (action.type) {
    case 'HYDRATE':
      return [...state, ...action.payload];
    case 'DELETE_CARD':
      return [...action.payload.stateUpdate];
    case 'CREATE_NEW_DECK':
    case 'DELETE_DECK':
    case 'ADD_NEW_CARD':
      return [...action.payload];
    default:
      return state;
  }
}

function deck(state = {}, action) {
  switch (action.type) {
    case 'SET_CURRENT_DECK':
      return { ...action.payload };
    case 'DELETE_DECK_TOGGLE':
      return { toggleDelete: action.payload };
    case 'DELETE_CARD':
      return { ...state, data: action.payload.newCards };
    default:
      return state;
  }
}

function card(state = {}, action) {
  switch (action.type) {
    case 'GET_CARD':
      return action.payload;
    case 'FLIP_CARD':
      return { ...state, cardSide: action.payload };
    case 'CLEAR_CARD':
    case 'DELETE_CARD':
      return {};
    default:
      return state;
  }
}

function user(state = {}, action) {
  switch (action.type) {
    case 'HYDRATE':
      return {
        ...state,
        isAuthenticated: true,
        user: {
          userId: action.payload.id,
          userName: action.payload.userName
        }
      };
    case 'AUTHENTICATED_USER':
      localStorage.setItem('user', action.payload.user);
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user
      };
    default:
      return state;
  }
}

const appReducer = combineReducers({
  decks,
  deck,
  card,
  user
});

export default appReducer;
