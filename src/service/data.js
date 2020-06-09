import axios from 'axios';
import API from './urls';

export default class DataService {
  constructor(userId) {
    this.axiosConfig = {
      params: {
        userId
      }
    };
  }

  async getAllDecks() {
    return axios.get(API.getAllDecks, this.axiosConfig);
  }

  async getDeck(deckId) {
    return axios.get(API.getDeck(deckId), this.axiosConfig);
  }

  async createNewDeck(deck) {
    const {
      deckName,
      frontOfCard: front,
      backOfCard: back,
      cardImage: image
    } = deck;

    return axios.post(
      API.createDeck,
      {
        deckName,
        card: {
          front,
          image,
          back
        }
      },
      this.axiosConfig
    );
  }

  async deleteDeckInDB(deckId) {
    return axios.delete(API.deleteDeck(deckId), this.axiosConfig);
  }

  async addCardToDB(card, deckId) {
    const { frontOfCard: front, backOfCard: back, cardImage: image } = card;

    return axios.post(
      API.createCard(deckId),
      {
        front,
        back,
        image
      },
      this.axiosConfig
    );
  }

  async editCardInDB(deckId, newCardValues, cardId) {
    const {
      frontOfCard: front,
      backOfCard: back,
      cardImage: image
    } = newCardValues;

    return axios.put(
      API.editORDeleteCard(deckId, cardId),
      {
        front,
        back,
        image
      },
      this.axiosConfig
    );
  }

  async deleteCardInDB(deckId, cardId) {
    return axios.delete(API.editORDeleteCard(deckId, cardId), this.axiosConfig);
  }
}
