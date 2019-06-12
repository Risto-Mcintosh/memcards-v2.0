const admin = require("firebase-admin");
const functions = require("firebase-functions");
const express = require("express");
const unsplash = require("./unsplash");
const cors = require("cors")({ origin: true });

admin.initializeApp();

var db = admin.firestore();
let userUid;

const app = express();
app.use(cors);

// const corsOptions = {
//   origin: "http://localhost:3000",
//   optionsSuccessStatus: 200
// };

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

app.get("/api/photos", async (req, res) => {
  const images = await unsplash.getImages(req.query.searchTerm, req.query.page);
  res.send(images);
});

exports.memcards = functions.https.onRequest(app);
