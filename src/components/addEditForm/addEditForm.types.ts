export type FormValues = {
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
