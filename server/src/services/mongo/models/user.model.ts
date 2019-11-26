import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import DeckSchema, { Deck } from './deck.model';

require('dotenv').config();

export interface User extends mongoose.Document {
  name: string;
  password: string;
  email: string;
}

export interface UserWithMongooseMethods extends User {
  decks: {
    id(_id: string): any;
  };
  generateAuthToken(): string;
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

UserSchema.method('generateAuthToken', function(this: User) {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
});

export const User = mongoose.model<User>('user', UserSchema);
