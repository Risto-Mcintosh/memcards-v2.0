import mongoose from 'mongoose';
import DeckSchema, { Deck } from './deck.model';

export interface User extends mongoose.Document {
  name: string;
  password: string;
  email: string;
}

export interface UserWithMongooseMethods extends User {
  decks: {
    id(_id: string): any;
  };
}
export interface UserWithDeckList extends User {
  decks: Array<Deck>;
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  decks: [DeckSchema]
});

export const User = mongoose.model<User>('user', UserSchema);
