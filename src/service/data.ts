import axios from 'axios';
import { Flashcard, uid } from '../types';

const DATA_SERVICE_URL = '';

export async function createNewDeck(values: Flashcard, uid: uid) {
  const {
    deckName,
    frontOfCard: front,
    backOfCard: back,
    cardImage: image
  } = values;
  try {
    await axios.post(DATA_SERVICE_URL, {
      data: {
        deckName,
        front,
        image,
        back
      }
    });

    // **** TODO ****
    // return cardId;

    // await db
    //   .collection(`users/${uid}/decks`)
    //   .doc(deckName)
    //   .set({ name: deckName, editable: true, cardCount: 1 });
    // const cardId = await db
    //   .collection(`users/${uid}/decks/${deckName}/data`)
    //   .add({
    //     front,
    //     image,
    //     back
    //   })
    //   .then(docRef => docRef.id);
  } catch (error) {
    console.log(error);
    return null;
  }
}
