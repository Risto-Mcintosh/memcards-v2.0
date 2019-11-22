import express, { Application } from 'express';
import mongoose from 'mongoose';
import Controller from './main.controller';

class App {
  public app: Application;

  public controller: Controller;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongoConfig();
    this.controller = new Controller(this.app);
  }

  private setConfig(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private setMongoConfig(): void {
    mongoose.connect('mongodb://localhost/memcards', {
      useNewUrlParser: true
    });

    mongoose.connection.once('open', () => console.log('database started'));
  }
}

export default new App().app;
