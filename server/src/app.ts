import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import Controller from './main.controller';
import DataService from './services/mongo/mongo.service';
import errorHandler from './middleware/errorHandler';

class App {
  public app: Application;

  public controller: Controller;

  constructor() {
    this.app = express();
    this.controller = new Controller(new DataService());
    this.setConfig();
    DataService.config();
  }

  private setConfig(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use('/api', this.controller.router);
    this.app.use(errorHandler);
  }
}

export default new App().app;
