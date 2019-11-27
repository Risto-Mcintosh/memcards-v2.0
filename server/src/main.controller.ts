import { Application } from 'express';
import MongoService from './services/mongo/mongo.service';

export default class Controller {
  private dataService: MongoService;

  constructor(private app: Application) {
    this.dataService = new MongoService();
    this.routes();
  }

  public routes() {
    this.app.route('/api/login').post(this.dataService.login);
    this.app.route('/api/create-user').post(this.dataService.createUser);
    this.app.route('/api/decks').get(this.dataService.getAllDecks);
    this.app.route('/api/deck').post(this.dataService.createDeck);
    this.app.route('/api/deck/:deckId').delete(this.dataService.deleteDeck);
    this.app.route('/api/card').post(this.dataService.createCard);
    this.app
      .route('/api/card/:cardId')
      .put(this.dataService.editCard)
      .delete(this.dataService.deleteCard);
  }
}
