import axios from 'axios';
import API from './urls';
import { Flashcard, Deck } from '../types';

class DataService {
  userId: string;

  constructor(userId: string) {
    this.userId = userId;
    this.configAxios();
  }

  configAxios() {
    axios.defaults.params = { userId: this.userId };
  }

  async getAllDecks() {
    return axios.get(API.getAllDecks);
  }

  async createNewDeck(deck: Deck) {
    const {
      deckName,
      frontOfCard: front,
      backOfCard: back,
      cardImage: image
    } = deck;

    return axios.post(API.createDeck, {
      deckName,
      front,
      image,
      back
    });
  }

  async deleteDeckInDB(deckId: string) {
    return axios.delete(API.deleteDeck(deckId));
  }
  async addCardToDB(card: Deck) {
    const {
      deckName,
      frontOfCard: front,
      backOfCard: back,
      cardImage: image
    } = card;

    return axios.post(API.createCard, {
      deckName,
      front,
      back,
      image
    });
  }

  async editCardInDB(deckId: string, newCardValues: Flashcard, cardId: string) {
    const {
      frontOfCard: front,
      backOfCard: back,
      cardImage: image
    } = newCardValues;

    return axios.post(API.editORDeleteCard(cardId), {
      deckId,
      card: {
        front,
        back,
        image
      }
    });
  }

  async deleteCardInDB(deckId: string, cardId: string) {
    return axios.delete(API.editORDeleteCard(cardId), {
      params: {
        deckId
      }
    });
  }
}
