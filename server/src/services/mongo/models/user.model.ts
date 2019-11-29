import mongoose, { Types } from 'mongoose';
import DeckSchema, { Deck } from './deck.model';

export interface User extends mongoose.Document {
  name: string;
  password: string;
  email: string;
  decks: Types.DocumentArray<Deck>;
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

const UserModel = mongoose.model<User>('user', UserSchema);
export default UserModel;
