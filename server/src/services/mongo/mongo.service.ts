import { Request, Response } from 'express';
import mongoose, { Connection, MongooseDocument } from 'mongoose';
import { Deck, FlashCard, User } from './models/index.models';

export default class MongoService {
  private db: any;

  constructor() {
    this.db = mongoose.connection;
  }

  static setConfig() {
    mongoose.connect('mongodb://localhost/memcards', {
      useNewUrlParser: true
    });

    mongoose.connection.once('open', () => console.log('database started'));
  }

  public sayHi(req: Request, res: Response) {
    return res.send('what up');
  }

  public async createUser(req: Request, res: Response) {
    const newUser = new User(req.body);
    console.log(req.body);

    try {
      await newUser.save();
      res.status(201).send();
    } catch (error) {
      res.status(400).send(error.errors);
    }
  }

  public async getAllDecks(req: Request, res: Response) {
    const decks = await Deck.find({});
    res.send({ decks });
  }

  public async createDeck(req: Request, res: Response) {
    // const deck = new Deck(req.body);
    // User.findById('5dd8063a7634a1028aaf4e90', (err, user: any) => {
    //   console.log('user :', user);
    //   user.decks.push({ name: 'First Mongotest deck', editable: true });
    //   user.save();
    //   console.log('user :', user);
    // });

    User.findById('5dd8063a7634a1028aaf4e90', (err, user: any) => {
      console.log('deck :', user.decks.id('5dd8ca0b7f828901ec80073f'));
    });
    res.send('completed!');
  }
}
