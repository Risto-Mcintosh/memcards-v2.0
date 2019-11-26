import mongoose, { Schema } from 'mongoose';
import FlashcardSchema, { Flashcard } from './flashcard.model';

export interface Deck {
  name: string;
  editable?: boolean;
}

export interface DeckWithFlashcardList extends Deck {
  data: Array<Flashcard>;
}
export interface DeckWithFlashcardQuery extends Deck {
  data: {
    id(_id: string): any;
    push(Flashcard: Flashcard): void;
  };
}

const DeckSchema: Schema = new mongoose.Schema(
  {
    name: String,
    editable: {
      type: Boolean,
      default: true
    },
    data: [FlashcardSchema]
  },
  { toJSON: { virtuals: true } }
);

DeckSchema.virtual('totalCards').get(function(
  this: DeckWithFlashcardList
): number {
  return this.data.length;
});

export default DeckSchema;
