import { Application } from 'express';
import MongoService from './services/mongo/mongo.service';

export default class Controller {
  private dataService: MongoService;

  constructor(private app: Application) {
    this.dataService = new MongoService();
    this.routes();
  }

  public routes() {
    this.app.route('/api').get(this.dataService.sayHi);
    this.app.route('/api/create-user').post(this.dataService.createUser);
    this.app.route('/api/decks').get(this.dataService.getAllDecks);
  }
}
