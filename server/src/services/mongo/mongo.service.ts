import { Request, Response } from 'express';
import mongoose, { Error } from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import joiValidation from '../joiValidation/validation';
import generateAuthToken from '../JsonWebTokens';
import { Flashcard } from './models/flashcard.model';
import UserModel, { User } from './models/user.model';

dotenv.config();
export default class MongoService {
  static setConfig() {
    mongoose.connect('mongodb://localhost/memcards', {
      useNewUrlParser: true
    });

    mongoose.connection.once('open', () => console.log('database started'));
  }

  public async login(req: Request, res: Response) {
    try {
      const { error } = joiValidation.validateLogin(req.body);
      if (error) throw error;

      const user = await UserModel.findOne({ email: req.body.email })
        .lean()
        .then((doc: User) => doc);

      if (!user) return res.status(400).send('email or password is incorrect');

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword)
        return res.status(400).send('email or password is incorrect');

      const token = generateAuthToken(user._id);

      return res
        .cookie('webToken', token, { httpOnly: true })
        .status(200)
        .send({ mes: 'login successful!' });
    } catch (e) {
      if (e.name === 'ValidationError') {
        return res.status(400).send(e.details[0].message);
      }
      console.log(e);
      return res.status(500).send();
    }
  }

  public async createUser(req: Request, res: Response) {
    try {
      const { error } = joiValidation.validateUser(req.body);
      if (error) throw error;

      const emailExist = await UserModel.exists({ email: req.body.email });
      if (emailExist) return res.status(400).send('email is already in use');

      const hashPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
      });

      await newUser.save();
      return res.status(201).send(newUser._id);
    } catch (e) {
      if (e.name === 'ValidationError') {
        return res.status(400).send(e.details[0].message);
      }
      console.log(e);
      return res.status(500).send();
    }
  }

  public async getAllDecks(req: Request, res: Response) {
    const user = await UserModel.findById(res.locals.user._id).select(
      '-password -email'
    );
    res.send(user);
  }

  public createDeck(req: Request, res: Response) {
    try {
      const { error } = joiValidation.validateFlashcard(req.body.card);
      if (error) throw error;

      const newDeck = {
        name: req.body.deckName,
        data: [{ ...req.body.card }]
      };
      UserModel.findById(
        res.locals.user._id,
        async (err: Error, user: User) => {
          if (err) throw err;
          if (!user) return res.status(400).send('user not found');
          user.decks.push(newDeck);
          await user.save();
          return res.status(201).send();
        }
      );
    } catch (e) {
      if (e.name === 'ValidationError') {
        res.status(400).send(e.details[0].message);
      } else {
        console.log(e);
        res.status(500).send();
      }
    }
  }

  public deleteDeck(req: Request, res: Response) {
    const deckToDelete = req.params.deckId;
    try {
      UserModel.findById(
        res.locals.user._id,
        async (err: Error, user: User) => {
          if (err) throw err;

          if (user === null) return res.status(400).send('user not found');

          user.decks.id(deckToDelete).remove();
          await user.save();
          return res.status(200).send();
        }
      );
    } catch (e) {
      console.log(e);
      res.status(500).send();
    }
  }

  public async createCard(req: Request, res: Response) {
    const newCard: Flashcard = {
      ...req.body.card
    };

    try {
      const { error } = joiValidation.validateFlashcard(newCard);
      if (error) throw error;

      await UserModel.findById(
        res.locals.user._id,
        (err: Error, user: User) => {
          if (err) throw err;

          if (user === null)
            return res.status(400).send({ err: 'user not found' });

          const deck = user.decks.id(req.body.deckId);
          deck.data.push(newCard);
          user.save();
          return res.status(201).send();
        }
      );
    } catch (e) {
      if (e.name === 'ValidationError') {
        res.status(400).send(e.details[0].message);
      } else {
        console.log(e);
        res.status(500).send();
      }
    }
  }

  public async editCard(req: Request, res: Response) {
    const cardToEdit = req.params.cardId;

    try {
      const { error } = joiValidation.validateFlashcard(req.body.card);
      if (error) throw error;

      const editedCard: Flashcard = req.body.card;

      await UserModel.findById(
        res.locals.user._id,
        (err: Error, user: User) => {
          if (err) throw err;

          if (user === null) return res.status(400).send('user not found');

          const deck = user.decks.id(req.body.deckId);

          if (deck === null) return res.status(400).send('deck not found');

          const card = deck.data.id(cardToEdit);

          if (card === null) return res.status(400).send('card not found');

          card.front = editedCard.front;
          card.back = editedCard.back;
          card.image = editedCard.image;

          user.save();
          return res.status(200).send(card);
        }
      );
    } catch (e) {
      if (e.name === 'ValidationError') {
        res.status(400).send(e.details[0].message);
      } else {
        console.log(e);
        res.status(500).send();
      }
    }
  }

  public deleteCard(req: Request, res: Response) {
    const cardToDelete = req.params.cardId;
    try {
      UserModel.findById(
        res.locals.user._id,
        async (err: Error, user: User) => {
          if (err) throw err;

          if (user === null) return res.status(400).send('user not found');

          const deck = user.decks.id(req.body.deckId);

          if (deck === null) return res.status(400).send('deck not found');

          deck.data.id(cardToDelete).remove();

          await user.save();
          return res.status(200).send('card deleted');
        }
      );
    } catch (e) {
      console.log(e);
      res.status(500).send();
    }
  }
}
