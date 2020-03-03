export default function card(state = {}, action) {
  switch (action.type) {
    case 'GET_CARD':
      return action.payload;
    case 'FLIP_CARD':
      return { ...state, cardSide: action.payload };
    case 'CLEAR_CARD':
    case 'DELETE_CARD':
    case 'LOGOUT_USER':
      return {};
    default:
      return state;
  }
}
