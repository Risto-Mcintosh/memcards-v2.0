import express, { Application } from 'express';
import cookieParser from 'cookie-parser';

import Controller from './main.controller';
import DataService from './services/mongo/mongo.service';

class App {
  public app: Application;

  public controller: Controller;

  constructor() {
    this.app = express();
    this.setConfig();
    DataService.setConfig();
    this.controller = new Controller(this.app, new DataService());
  }

  private setConfig(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }
}

export default new App().app;
