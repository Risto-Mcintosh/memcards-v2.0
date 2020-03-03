export default function user(state = {}, action) {
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
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user
      };
    case 'LOGOUT_USER':
      return {
        isAuthenticated: false,
        user: {}
      };
    default:
      return state;
  }
}
