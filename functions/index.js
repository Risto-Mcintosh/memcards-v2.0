const admin = require("firebase-admin");
const functions = require("firebase-functions");
const express = require("express");
const serviceAccount = require("./memcards.json");
const cors = require("cors")({ origin: true });

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();
let userUid;

const app = express();
app.use(cors);

async function getCard(docId) {
  let results = [];

  await db
    .collection(`users/${userUid}/decks/${docId}/data/`)
    .get()
    .then(snapshot =>
      snapshot.forEach(doc =>
        results.push({ deckId: docId, id: doc.id, ...doc.data() })
      )
    );

  return results;
}

app.get("/api", async (req, res) => {
  let results = [];
  userUid = req.query.uid;
  const deckSnapshot = await db.collection(`users/${userUid}/decks`).get();
  const promises = [];

  deckSnapshot.forEach(doc => {
    const p = getCard(doc.id);
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

  res.send({ dataModel });
});

exports.memcards = functions.https.onRequest(app);
