import { Application } from 'express';
import MongoService from './services/mongo.service';

export default class Controller {
  private dataService: MongoService;

  constructor(private app: Application) {
    this.dataService = new MongoService();
    this.routes();
  }

  public routes(): void {
    this.app.route('/').get(this.dataService.sayHi);
  }
}
