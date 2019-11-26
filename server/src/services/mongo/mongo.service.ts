import { Request, Response } from 'express';
import mongoose, { Error } from 'mongoose';
import bcrypt from 'bcrypt';
import joiValidation from '../joiValidation/validation';
import {
  DeckWithFlashcardQuery,
  DeckWithFlashcardList
} from './models/deck.model';
import { Flashcard } from './models/flashcard.model';
import {
  User,
  UserWithMongooseMethods,
  UserWithDeckList
} from './models/user.model';

export default class MongoService {
  static setConfig() {
    mongoose.connect('mongodb://localhost/memcards', {
      useNewUrlParser: true
    });

    mongoose.connection.once('open', () => console.log('database started'));
  }

  public login(req: Request, res: Response) {
    const { error } = joiValidation.validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const userExist = User.findOne({ email: req.body.email });

    if (!userExist)
      return res.status(400).send('email or password is incorrect');

    try {
      userExist.exec(async (err: Error, user: UserWithMongooseMethods) => {
        if (err) return res.send(err);

        const validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );

        if (!validPassword)
          return res.status(400).send('email or password is incorrect');

        const token = user.generateAuthToken();

        return res.cookie('webToken', token, { httpOnly: true });
      });
      return res.status(200).send('login successful!');
    } catch (e) {
      console.log(e);
      return res.status(500);
    }
  }

  public async createUser(req: Request, res: Response) {
    const { error } = joiValidation.validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExist = User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('email already in use');

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword
    });

    try {
      await newUser.save();
      return res.status(201).send();
    } catch (e) {
      return res.status(400).send(e);
    }
  }

  public async getAllDecks(req: Request, res: Response) {
    const user = await User.findById(req.body.userId).select('-password');
    res.send(user);
  }

  public async createDeck(req: Request, res: Response) {
    const newDeck: DeckWithFlashcardList = {
      name: req.body.deckName,
      data: [{ ...req.body.card }]
    };
    // user Id '5dd8063a7634a1028aaf4e90'
    // deck Id "postman test deck" '5dda9e928d042c0341f44d26'
    // card Id '5dda9e928d042c0341f44d27'
    try {
      await User.findById(
        req.body.userId,
        (err: Error, user: UserWithDeckList) => {
          if (err) return res.send(err);
          if (user === null) return res.status(400).send({ err });
          user.decks.push(newDeck);
          user.save();
          return res.send(user.decks);
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  public async deleteDeck(req: Request, res: Response) {
    const deckToDelete = req.params.deckId;
    // user Id '5dd8063a7634a1028aaf4e90'
    // deck Id "postman test deck" '5dda9e928d042c0341f44d26'
    // card Id '5dda9e928d042c0341f44d27'
    try {
      await User.findById(
        req.body.userId,
        (err: Error, user: UserWithMongooseMethods) => {
          if (err) {
            return res.send(err);
          }
          if (user === null) return res.status(400).send('user not found');

          user.decks.id(deckToDelete).remove();
          user.save();
          return res.send('deck delete!');
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  public async createCard(req: Request, res: Response) {
    const newCard: Flashcard = {
      ...req.body.card
    };
    try {
      await User.findById(
        req.body.userId,
        (err: Error, user: UserWithMongooseMethods) => {
          if (err) return res.send(err);

          if (user === null)
            return res.status(400).send({ err: 'user not found' });

          const deck: DeckWithFlashcardQuery = user.decks.id(req.body.deckId);
          deck.data.push(newCard);
          user.save();
          return res.status(200).send(deck);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  public editCard(req: Request, res: Response) {
    const cardToEdit = req.params.cardId;
    const editedCard: Flashcard = {
      ...req.body.card
    };

    try {
      User.findById(
        req.body.userId,
        (err: Error, user: UserWithMongooseMethods) => {
          if (err) return res.send(err);

          if (user === null) return res.status(400).send('user not found');

          const deck: DeckWithFlashcardQuery = user.decks.id(req.body.deckId);

          if (deck === null) return res.status(400).send('deck not found');

          const card: Flashcard = deck.data.id(cardToEdit);

          if (card === null) return res.status(400).send('card not found');

          card.front = editedCard.front;
          card.back = editedCard.back;
          card.image = editedCard.image;

          user.save();
          return res.status(200).send(card);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteCard(req: Request, res: Response) {
    const cardToDelete = req.params.cardId;
    try {
      await User.findById(
        req.body.userId,
        (err: Error, user: UserWithMongooseMethods) => {
          if (err) return res.send(err);

          if (user === null) return res.status(400).send('user not found');

          const deck: DeckWithFlashcardQuery = user.decks.id(req.body.deckId);

          if (deck === null) return res.status(400).send('deck not found');

          deck.data.id(cardToDelete).remove();

          user.save();
          return res.status(200).send('card deleted');
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
}
