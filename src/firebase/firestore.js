import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);
firebase.firestore().enablePersistence();

const db = firebase.firestore();

export async function createNewDeck(values, uid) {
  const {
    deckName,
    frontOfCard: front,
    backOfCard: back,
    cardImage: image
  } = values;

  try {
    await db
      .collection(`users/${uid}/decks`)
      .doc(deckName)
      .set({ name: deckName, editable: true, cardCount: 1 });
    const cardId = await db
      .collection(`users/${uid}/decks/${deckName}/data`)
      .add({
        front,
        image,
        back
      })
      .then(docRef => docRef.id);
    return cardId;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getAllCards(deckName, uid) {
  try {
    const results = [];

    await db
      .collection(`users/${uid}/decks/${deckName}/data/`)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc =>
          results.push({ deckId: deckName, id: doc.id, ...doc.data() })
        );
      });
    return results;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function getAllDecks(uid) {
  try {
    const results = [];
    const deckSnapshot = await db.collection(`users/${uid}/decks`).get();
    const promises = [];

    deckSnapshot.forEach(doc => {
      const p = getAllCards(doc.id, uid);
      promises.push(p);
      results.push({ id: doc.id, ...doc.data() });
    });

    const cardData = await Promise.all(promises);
    const dataModel = results.map((deck, index) => ({
      id: deck.id,
      name: deck.name,
      editable: deck.editable,
      data: cardData[index].filter(doc => deck.id === doc.deckId)
    }));

    return dataModel;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function addCardToDB(newCard, uid) {
  const {
    deckName,
    frontOfCard: front,
    backOfCard: back,
    cardImage: image
  } = newCard;

  try {
    const cardId = await db
      .collection(`users/${uid}/decks/${deckName}/data`)
      .add({
        front,
        image,
        back
      })
      .then(docRef => docRef.id);

    return cardId;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function editCardInDB(deckId, card, cardId, uid) {
  const { frontOfCard: front, backOfCard: back, cardImage: image } = card;
  try {
    await db.doc(`users/${uid}/decks/${deckId}/data/${cardId}`).set({
      front,
      image,
      back
    });
  } catch (err) {
    console.log(err);
  }
}

export async function deleteCardInDB(deckId, cardId, uid) {
  try {
    await db
      .collection(`users/${uid}/decks/${deckId}/data/`)
      .doc(cardId)
      .delete();
  } catch (err) {
    console.log(err);
  }
}

export async function deleteDeckInDB(deckId, uid) {
  try {
    await db
      .collection(`users/${uid}/decks`)
      .doc(deckId)
      .delete();
  } catch (err) {
    console.log(err);
  }
}
