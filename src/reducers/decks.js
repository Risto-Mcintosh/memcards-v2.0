export default function decks(state = [], action) {
  switch (action.type) {
    case 'HYDRATE':
      return [...state, ...action.payload];
    case 'CREATE_NEW_DECK':
      return [...state, action.payload];
    case 'DELETE_CARD':
      return [...action.payload.stateUpdate];
    case 'DELETE_DECK':
    case 'ADD_NEW_CARD':
      return [...action.payload];
    case 'LOGOUT_USER':
      return {};
    default:
      return state;
  }
}
