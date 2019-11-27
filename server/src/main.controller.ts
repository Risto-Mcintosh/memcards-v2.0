import { Application } from 'express';
import MongoService from './services/mongo/mongo.service';
import auth from './middleware/auth';

export default class Controller {
  private dataService: MongoService;

  constructor(private app: Application) {
    this.dataService = new MongoService();
    this.routes();
  }

  public routes() {
    this.app.route('/api/login').post(this.dataService.login);
    this.app.route('/api/register').post(this.dataService.createUser);
    this.app.route('/api/decks').get(auth, this.dataService.getAllDecks);
    this.app.route('/api/deck').post(auth, this.dataService.createDeck);
    this.app
      .route('/api/deck/:deckId')
      .delete(auth, this.dataService.deleteDeck);
    this.app.route('/api/card').post(auth, this.dataService.createCard);
    this.app
      .route('/api/card/:cardId')
      .put(auth, this.dataService.editCard)
      .delete(auth, this.dataService.deleteCard);
  }
}
