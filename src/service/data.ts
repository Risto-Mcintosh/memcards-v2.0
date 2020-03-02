import axios, { AxiosRequestConfig } from 'axios';
import API from './urls';
import { Flashcard, Deck } from '../types';

export default class DataService {
  axiosConfig: AxiosRequestConfig;

  constructor(userId: string) {
    this.axiosConfig = {
      params: {
        userId
      }
    };
  }

  async getAllDecks() {
    return axios.get(API.getAllDecks, this.axiosConfig);
  }

  async getDeck(deckId: string) {
    return axios.get(API.getDeck(deckId), this.axiosConfig);
  }

  async createNewDeck(deck: Deck) {
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

  async deleteDeckInDB(deckId: string) {
    return axios.delete(API.deleteDeck(deckId), this.axiosConfig);
  }

  async addCardToDB(card: Deck, deckId: string) {
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

  async editCardInDB(deckId: string, newCardValues: Flashcard, cardId: string) {
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

  async deleteCardInDB(deckId: string, cardId: string) {
    return axios.delete(API.editORDeleteCard(deckId, cardId), this.axiosConfig);
  }
}
