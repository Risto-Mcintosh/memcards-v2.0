const admin = require('firebase-admin');
const functions = require('firebase-functions');
// const express = require('express');
// const cors = require('cors')({ origin: true });
const serviceAccount = require('./memcards.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

exports.userDeckCount = functions.firestore
  .document('users/{userId}/decks/{deckId}')
  .onWrite((change, context) => {
    const user = context.params.userId;

    const docRef = db.collection('users').doc(user);

    return db
      .collection(`users/${user}/decks`)
      .get()
      .then(querySnapshot => {
        const deckCount = querySnapshot.size;
        return docRef.set({ deckCount });
      })
      .catch(e => console.log(e));
  });

exports.cardCount = functions.firestore
  .document('users/{userId}/decks/{deckId}/data/{cardId}')
  .onWrite((change, context) => {
    const user = context.params.userId;
    const deck = context.params.deckId;

    const docRef = db.collection(`users/${user}/decks`).doc(deck);

    return db
      .collection(`users/${user}/decks/${deck}/data`)
      .get()
      .then(querySnapshot => {
        const cardCount = querySnapshot.size;
        return docRef.update({ cardCount });
      })
      .catch(e => console.log(e));
  });
