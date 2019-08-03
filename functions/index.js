const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors')({ origin: true });
const serviceAccount = require('./memcards.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();
let userUid;

const app = express();
app.use(cors);

exports.memcards = functions.https.onRequest(app);
