import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
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
    const { app } = this;
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use('/api', this.controller.router);
    app.use(errorHandler);
  }
}

export default new App().app;
