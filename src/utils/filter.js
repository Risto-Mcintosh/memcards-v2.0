export function findId(arr, i) {
  return arr.find(item => item.id === i);
}

export function filterList(original, modified) {
  return original.filter(o => o.id !== modified.id);
}

function DeckFilter(allDecks, modifiedDeck, deckId) {
  return [
    ...filterList(allDecks, findId(modifiedDeck, deckId)),
    ...modifiedDeck
  ];
}

function filterState(currState, deckName, deckId) {
  return DeckFilter(
    currState,
    [
      {
        id: deckId,
        name: deckName
      }
    ],
    deckId
  );
}

export default filterState;
