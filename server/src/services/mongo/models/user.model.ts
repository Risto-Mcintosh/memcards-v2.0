import mongoose from 'mongoose';
import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import DeckSchema, { Deck } from './deck.model';

require('dotenv').config();

export interface User extends mongoose.Document {
  name: string;
  password: string;
  email: string;
}

export interface UserWithDeckQuery extends User {
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

UserSchema.method('generateAuthToken', function(this: User) {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
});

export function validateUser(user: User) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required()
  });

  return schema.validate(user);
}

export const User = mongoose.model<User>('user', UserSchema);
