const BASE_URL = '/api';
export default {
  login: BASE_URL + '/login',
  register: BASE_URL + '/register',
  createDeck: BASE_URL + '/deck',
  getAllDecks: BASE_URL + '/decks',
  /** appends deckId to api url  */
  getDeck(deckId: string) {
    return BASE_URL + `/deck/${deckId}`;
  },
  /** appends deckId to api url  */
  deleteDeck(deckId: string) {
    return BASE_URL + `/deck/${deckId}`;
  },
  createCard(deckId: string) {
    return BASE_URL + `/deck/${deckId}/card`;
  },
  /** appends cardId to api url  */
  editORDeleteCard(deckId: string, cardId: string) {
    return BASE_URL + `/deck/${deckId}/card/${cardId}`;
  },
  images(pageNumber: number, searchTerm: string) {
    return `https://api.unsplash.com/search/photos?page=${pageNumber}&query=${searchTerm}&orientation=landscape`;
  }
};
