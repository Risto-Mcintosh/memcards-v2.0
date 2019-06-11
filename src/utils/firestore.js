import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import axios from "axios";
import firebaseConfig from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);
firebase.firestore().enablePersistence();

const db = firebase.firestore();
const user = firebase.auth().currentUser;
console.log(user);
const userDecks = !user ? null : `users/${user.uid}/decks`;

export async function createNewDeck(values) {
  const {
    deckName,
    frontOfCard: front,
    backOfCard: back,
    cardImage: image
  } = values;

  try {
    await db
      .collection(userDecks)
      .doc(deckName)
      .set({ name: deckName, editable: true });
    const cardId = await db
      .collection(`${userDecks}/${deckName}/data`)
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
    let results = await axios(
      "http://localhost:5000/memcards-17/us-central1/memcards/api/",
      {
        params: {
          uid: user.uid
        }
      }
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
      .collection(`${userDecks}/${deckName}/data`)
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
    await db.doc(`${userDecks}/${deckId}/data/${cardId}`).set({
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
      .collection(`${userDecks}/${deckId}/data/`)
      .doc(cardId)
      .delete();
  } catch (err) {
    console.log(err);
  }
}

export async function deleteDeckInDB(deckId) {
  try {
    await db
      .collection(userDecks)
      .doc(deckId)
      .delete();
  } catch (err) {
    console.log(err);
  }
}
