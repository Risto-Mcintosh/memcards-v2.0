import express, { Application } from 'express';
import cookieParser from 'cookie-parser';

import Controller from './main.controller';
import MongoService from './services/mongo/mongo.service';

class App {
  public app: Application;

  public controller: Controller;

  constructor() {
    this.app = express();
    this.setConfig();
    MongoService.setConfig();
    this.controller = new Controller(this.app, new MongoService());
  }

  private setConfig(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }
}

export default new App().app;
