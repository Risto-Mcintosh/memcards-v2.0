import mongoose from 'mongoose';

const FlashCardSchema = new mongoose.Schema({
  front: String,
  back: String,
  image: {
    src: String,
    alt: String,
    thumb: String
  }
});

const DeckSchema = new mongoose.Schema({
  name: String,
  editable: Boolean,
  data: [FlashCardSchema]
});

export const Deck = mongoose.model('Deck', DeckSchema);
