import { Application } from 'express';
import { DataService } from './services/dataService.types';
import auth from './middleware/auth';
import errorHandler from './middleware/errorHandler';
import unsplash from './services/unsplash/unsplash';

export default class Controller {
  private app: Application;

  private dataService: DataService;

  constructor(_app: Application, _dataService: DataService) {
    this.app = _app;
    this.dataService = _dataService;
    this.routes();
    this.app.use(errorHandler);
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
    this.app.route('/api/getImages').get(auth, unsplash);
  }
}
