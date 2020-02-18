const BASE_URL = 'api';
export default {
  login: BASE_URL + '/login',
  register: BASE_URL + '/register',
  createDeck: BASE_URL + '/deck',
  getAllDecks: BASE_URL + '/decks',
  /** appends deckId to api url  */
  deleteDeck(deckId: string) {
    return BASE_URL + `/deck/${deckId}`;
  },
  createCard: BASE_URL + '/card',
  /** appends cardId to api url  */
  editORDeleteCard(cardId: string) {
    return BASE_URL + `/card/${cardId}`;
  },
  images: BASE_URL + '/images'
};
