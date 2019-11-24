import { Schema } from 'mongoose';

export interface Flashcard {
  _id: number;
  front: string;
  back: string;
  image?: {
    src: string;
    alt: string;
    thumb: string;
  };
}

const FlashcardSchema: Schema = new Schema({
  front: {
    type: String,
    required: true
  },
  back: {
    type: String,
    required: true
  },
  image: {
    src: String,
    alt: String,
    thumb: String
  }
});

export default FlashcardSchema;
