import * as firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBky4gQ2_Oj9FaHQl__2qygsPM2bC5seM8",
  authDomain: "memcards-17.firebaseapp.com",
  databaseURL: "https://memcards-17.firebaseio.com",
  projectId: "memcards-17",
  storageBucket: "memcards-17.appspot.com",
  messagingSenderId: "455837639885",
  appId: "1:455837639885:web:aff25287d5600eda"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const newDeck = "users/ByEwGojiQUML6HqdntGx/decks";

export async function createNewDeck(values) {
  const { deckName, frontOfCard: front, backOfCard: back } = values;

  try {
    await db.collection(newDeck)
    .doc(deckName)
    .set({ name: deckName, editable: true });
  await db.collection(`users/ByEwGojiQUML6HqdntGx/decks/${deckName}/data`).add({
    front,
    back
  });
  } catch (error) {
    console.log(error);
  }
}

export async function getAllDecks() {
  try {
   let results = [];
  await db
    .collection(newDeck)
    .get()
    .then(snapshot =>
      snapshot.forEach(doc => results.push({ id: doc.id, ...doc.data() }))
    );
    return results
  } catch (err) {
    console.log(err);
  }
}

export async function addCardToDB(newCard) {
  const { deckName, frontOfCard: front, backOfCard: back } = newCard;

  try {
    await db
    .collection(
      `users/ByEwGojiQUML6HqdntGx/decks/${deckName}/data/`
    )
    .add({
      front,
      back
    });
  } catch (err) {
    console.log(err);
  }
}

export async function editCardInDB(deckId, card, cardId) {
  const { frontOfCard: front, backOfCard: back } = card;
  try {
    await db
    .doc(
      `users/ByEwGojiQUML6HqdntGx/decks/${deckId}/data/${cardId}`
    )
    .set({
      front,
      back
    });
  } catch (err) {
    console.log(err);
  }
}

export async function deleteCardInDB(deckId, cardId) {
  try {
    await db
    .collection(`users/ByEwGojiQUML6HqdntGx/decks/${deckId}/data/`)
    .doc(cardId)
    .delete();
  } catch (err) {
    console.log(err);
  }
}

export async function deleteDeckInDB(deckId) {
  try {
    await db
    .collection(newDeck)
    .doc(deckId)
    .delete();
  } catch (err) {
    console.log(err);
  }
}
