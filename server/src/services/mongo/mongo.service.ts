import { Request, Response } from 'express';
import mongoose, { Error } from 'mongoose';
import {
  DeckWithFlashcardQuery,
  DeckWithFlashcardList
} from './models/deck.model';
import { Flashcard } from './models/flashcard.model';
import { User, UserWithDeckQuery, UserWithDeckList } from './models/user.model';

export default class MongoService {
  static setConfig() {
    mongoose.connect('mongodb://localhost/memcards', {
      useNewUrlParser: true
    });

    mongoose.connection.once('open', () => console.log('database started'));
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
    const getUser = await User.findById('5dd8063a7634a1028aaf4e90').select(
      '-password'
    );
    res.send(getUser);
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
      await User.findById(req.body.userId, (err, user: UserWithDeckList) => {
        if (user === null) return res.status(400).send({ err });
        user.decks.push(newDeck);
        user.save();
        return res.send(user.decks);
      });
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
      await User.findById(req.body.userId, (err, user: UserWithDeckQuery) => {
        if (user === null) return res.status(400).send('user not found');
        user.decks.id(deckToDelete).remove();
        user.save();
        return res.send('deck delete!');
      });
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
        (err: Error, user: UserWithDeckQuery) => {
          if (user === null)
            return res.status(400).send({ err: 'user not found' });

          console.log('deck :', user.decks.id(req.body.deckId));
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

  public async editCard(req: Request, res: Response) {
    const cardToEdit = req.params.cardId;
    const editedCard: Flashcard = {
      ...req.body.card
    };

    try {
      await User.findById(req.body.userId, (err, user: UserWithDeckQuery) => {
        if (user === null)
          return res.status(400).send({ err: 'user not found' });

        const deck: DeckWithFlashcardQuery = user.decks.id(req.body.deckId);

        if (deck === null)
          return res.status(400).send({ err: 'card not found' });

        const card: Flashcard = deck.data.id(cardToEdit);

        if (card === null)
          return res.status(400).send({ err: 'card not found' });

        card.front = editedCard.front;
        card.back = editedCard.back;
        card.image = editedCard.image;

        user.save();
        return res.status(200).send(card);
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteCard(req: Request, res: Response) {
    const cardToDelete = req.params.cardId;
    try {
      await User.findById(req.body.userId, (err, user: UserWithDeckQuery) => {
        if (user === null)
          return res.status(400).send({ err: 'user not found' });

        const deck: DeckWithFlashcardQuery = user.decks.id(req.body.deckId);

        if (deck === null)
          return res.status(400).send({ err: 'card not found' });

        deck.data.id(cardToDelete).remove();

        user.save();
        return res.status(200).send('card deleted');
      });
    } catch (error) {
      console.log(error);
    }
  }
}
