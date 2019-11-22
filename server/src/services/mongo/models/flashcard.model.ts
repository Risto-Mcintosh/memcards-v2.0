import mongoose from 'mongoose';

const FlashCardSchema = new mongoose.Schema({
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

export const DeckSchema = new mongoose.Schema({
  name: String,
  editable: Boolean,
  data: [FlashCardSchema]
});

export const Deck = mongoose.model('deck', DeckSchema);
export const FlashCard = mongoose.model('flashCard', FlashCardSchema);
