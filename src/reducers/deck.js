export default function deck(state = {}, action) {
  switch (action.type) {
    case 'SET_CURRENT_DECK':
      return { ...action.payload };
    case 'DELETE_DECK_TOGGLE':
      return { toggleDelete: action.payload };
    case 'DELETE_CARD':
      return { ...state, data: action.payload.newCards };
    case 'LOGOUT_USER':
      return {};
    default:
      return state;
  }
}
