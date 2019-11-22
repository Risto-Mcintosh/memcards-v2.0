import { Application } from 'express';
import MongoService from './services/mongo.service';

export default class Controller {
  private mongoService: MongoService;

  constructor(private app: Application) {
    this.mongoService = new MongoService();
    this.routes();
  }

  public routes(): void {
    this.app.route('/').get(this.mongoService.sayHi);
  }
}
