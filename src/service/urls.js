const BASE_URL = '/api';
export default {
  login: BASE_URL + '/login',
  logout: BASE_URL + '/logout',
  register: BASE_URL + '/register',
  createDeck: BASE_URL + '/deck',
  getAllDecks: BASE_URL + '/decks',
  /** appends deckId to api url  */
  getDeck(deckId) {
    return BASE_URL + `/deck/${deckId}`;
  },
  /** appends deckId to api url  */
  deleteDeck(deckId) {
    return BASE_URL + `/deck/${deckId}`;
  },
  createCard(deckId) {
    return BASE_URL + `/deck/${deckId}/card`;
  },
  /** appends cardId to api url  */
  editORDeleteCard(deckId, cardId) {
    return BASE_URL + `/deck/${deckId}/card/${cardId}`;
  },
  images(pageNumber, searchTerm) {
    return `https://api.unsplash.com/search/photos?page=${pageNumber}&query=${searchTerm}&orientation=landscape`;
  }
};
