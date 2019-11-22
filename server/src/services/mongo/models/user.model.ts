import mongoose from 'mongoose';
import { DeckSchema } from './flashcard.model';

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
