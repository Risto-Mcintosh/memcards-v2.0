import PouchDB from "pouchdb";
import uuid from "uuid/v4";

const db = new PouchDB("userDecks");

export const changes = db.changes({
  since: "now",
  live: true,
  include_docs: true
});

export function createNewDeck(values) {
  const { deckName, frontOfCard: front, backOfCard: back } = values;

  const doc = {
    _id: deckName,
    name: deckName,
    editable: true,
    data: [{ id: uuid(), front, back }]
  };

  try {
    db.put(doc);
  } catch (error) {
    console.log(error);
  }
}

export async function getAllLocalDecks() {
  try {
    const result = await db.allDocs({
      include_docs: true
    });

    const mapResult = result.rows.map(deck => deck.doc);
    return mapResult;
  } catch (err) {
    console.log(err);
  }
}

export async function addCardToDB(newCard) {
  const { deckName, frontOfCard: front, backOfCard: back } = newCard;

  try {
    const doc = await db.get(deckName);

    const newCard = [...doc.data, { id: uuid(), front, back }];

    db.put({
      _rev: doc._rev,
      ...doc,
      data: newCard
    });
  } catch (err) {
    console.log(err);
  }
}

export async function editCardInDB(deckId, card, cardId) {
  const { frontOfCard: front, backOfCard: back } = card;
  try {
    const doc = await db.get(deckId);

    let data = doc.data;
    const cardFound = data.findIndex(card => card.id === cardId);
    data[cardFound] = { id: cardId, front, back };

    db.put({
      _rev: doc._rev,
      ...doc,
      data
    });
  } catch (err) {
    console.log(err);
  }
}

export async function deleteCardInDB(deckId, cardId) {
  try {
    const doc = await db.get(deckId);

    let data = doc.data.filter(card => card.id !== cardId);
    db.put({
      _rev: doc._rev,
      ...doc,
      data
    });
  } catch (err) {
    console.log(err);
  }
}

export async function deleteDeckInDB(deckId) {
  try {
    const doc = await db.get(deckId);
    db.remove(doc);
  } catch (err) {
    console.log(err);
  }
}
