import mongoose from 'mongoose';
import DeckSchema, {
  Deck,
  DeckWithFlashcardList,
  DeckWithFlashcardQuery
} from './deck.model';

export interface User extends mongoose.Document {
  name: string;
  password: string;
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
  decks: [DeckSchema]
});

export const User = mongoose.model('user', UserSchema);
