export type Flashcard = {
  /** Name of deck */
  deckName: string;
  frontOfCard: string;
  backOfCard: string;
  cardImage?: null | {
    src: string;
    alt: string;
    thumb: string;
  };
};

export type uid = string;
