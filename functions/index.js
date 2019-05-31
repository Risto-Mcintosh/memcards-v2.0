const admin = require("firebase-admin");
const functions = require("firebase-functions");
const express = require("express");

var serviceAccount = require("./memcards17.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();
const newDeck = "users/ByEwGojiQUML6HqdntGx/decks";
const newCard = "users/ByEwGojiQUML6HqdntGx/decks/02b1oSWaOuImQ2de0flj/data";

const app = express();

// const doc = {
//   name: "test 2",
//   editable: true,
//   data: { front: "front", back: "back" }
// };

async function getCard(docId) {
  let results = [];

  await db
    .collection(`users/ByEwGojiQUML6HqdntGx/decks/${docId}/data/`)
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
  const deckSnapshot = await db.collection(newDeck).get();
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

// app.get("/api/edit", async (req, res) => {
//   await db
//     .doc(
//       `users/ByEwGojiQUML6HqdntGx/decks/${doc.name}/data/eoleRJc8FvRATn3p4FVM`
//     )
//     .set({
//       front: "front3",
//       back: "back3"
//     });
//   res.json({ what: "up!" });
// });

// app.get("/api/delete", async (req, res) => {
//   await db
//     .collection(`users/ByEwGojiQUML6HqdntGx/decks/${doc.name}/data/`)
//     .doc("eoleRJc8FvRATn3p4FVM")
//     .delete();
//   res.json({ what: "up!" });
// });

// app.post("/api", (req, res) => {
//   db.collection(newDeck)
//     .doc(doc.name)
//     .set({ name: doc.name, editable: true });
//   db.collection(`users/ByEwGojiQUML6HqdntGx/decks/${doc.name}/data`).add({
//     front: "front",
//     back: "back"
//   });
//   res.json({ what: "up!" });
// });

exports.memcards = functions.https.onRequest(app);
