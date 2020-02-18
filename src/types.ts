export type Flashcard = {
  frontOfCard: string;
  backOfCard: string;
  cardImage?: null | {
    src: string;
    alt: string;
    thumb: string;
  };
};

export type Deck = Flashcard & {
  deckName: string;
};
