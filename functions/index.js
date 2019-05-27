const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');
admin.initializeApp(functions.config().firebase);

const app = express()

var db = admin.firestore();

app.get('/api', (req,res)=> {
  const allDecks = db.collection('users/ByEwGojiQUML6HqdntGx/decks');
  res.json(allDecks);
})


exports.memcards = functions.https.onRequest(app);
