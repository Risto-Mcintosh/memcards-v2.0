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

const doc = {
  name: "test 2",
  editable: true,
  data: { front: "front", back: "back" }
};

// app.get("/api", async (req, res) => {
//   let results = [];
//   await db
//     .collection(newDeck)
//     .get()
//     .then(snapshot =>
//       snapshot.forEach(doc => results.push({ id: doc.id, ...doc.data() }))
//     );
//   res.json({ results });
// });

app.get("/api/edit", async (req, res) => {
  await db
    .doc(
      `users/ByEwGojiQUML6HqdntGx/decks/${doc.name}/data/eoleRJc8FvRATn3p4FVM`
    )
    .set({
      front: "front3",
      back: "back3"
    });
  res.json({ what: "up!" });
});

app.get("/api/delete", async (req, res) => {
  await db
    .collection(`users/ByEwGojiQUML6HqdntGx/decks/${doc.name}/data/`)
    .doc("eoleRJc8FvRATn3p4FVM")
    .delete();
  res.json({ what: "up!" });
});

app.post("/api", (req, res) => {
  db.collection(newDeck)
    .doc(doc.name)
    .set({ name: doc.name, editable: true });
  db.collection(`users/ByEwGojiQUML6HqdntGx/decks/${doc.name}/data`).add({
    front: "front",
    back: "back"
  });
  res.json({ what: "up!" });
});

exports.memcards = functions.https.onRequest(app);
