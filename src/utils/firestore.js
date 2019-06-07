import * as firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);
firebase.firestore().enablePersistence();

const db = firebase.firestore();
const newDeck = "users/ByEwGojiQUML6HqdntGx/decks";

export async function createNewDeck(values) {
  const {
    deckName,
    frontOfCard: front,
    backOfCard: back,
    cardImage: image
  } = values;

  try {
    await db
      .collection(newDeck)
      .doc(deckName)
      .set({ name: deckName, editable: true });
    const cardId = await db
      .collection(`users/ByEwGojiQUML6HqdntGx/decks/${deckName}/data`)
      .add({
        front,
        image,
        back
      })
      .then(function(docRef) {
        return docRef.id;
      });

    return cardId;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllDecks() {
  try {
    let results = await fetch(
      "http://localhost:5000/memcards-17/us-central1/memcards/api/"
    )
      .then(res => res.json())
      .then(data => data.dataModel);
    return results;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function getAllCards(deckName) {
  try {
    let results = [];
    await db
      .collection(`users/ByEwGojiQUML6HqdntGx/decks/${deckName}/data/`)
      .get()
      .then(snapshot =>
        snapshot.forEach(doc => results.push({ id: doc.id, ...doc.data() }))
      );
    return results;
  } catch (err) {
    console.log(err);
  }
}

export async function addCardToDB(newCard) {
  const {
    deckName,
    frontOfCard: front,
    backOfCard: back,
    cardImage: image
  } = newCard;

  try {
    const cardId = await db
      .collection(`users/ByEwGojiQUML6HqdntGx/decks/${deckName}/data`)
      .add({
        front,
        image,
        back
      })
      .then(function(docRef) {
        return docRef.id;
      });

    return cardId;
  } catch (err) {
    console.log(err);
  }
}

export async function editCardInDB(deckId, card, cardId) {
  const { frontOfCard: front, backOfCard: back, cardImage: image } = card;
  try {
    await db
      .doc(`users/ByEwGojiQUML6HqdntGx/decks/${deckId}/data/${cardId}`)
      .set({
        front,
        image,
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
