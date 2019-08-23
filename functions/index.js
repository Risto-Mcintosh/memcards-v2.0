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
