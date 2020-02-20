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

export function CardFilter(allDecks, modifiedCard, deckName, cardId) {
  const filteredDeck = findId(allDecks, deckName);

  if (modifiedCard.length > 1 || !cardId || !filteredDeck) {
    return modifiedCard;
  }

  return [
    ...filterList(filteredDeck.data, findId(modifiedCard, cardId)),
    ...modifiedCard
  ];
}

function filterState(currState, deckName, deckId, cardData, cardId) {
  return DeckFilter(
    currState,
    [
      {
        id: deckId,
        name: deckName,
        editable: true,
        data: CardFilter(currState, cardData, deckId, cardId)
      }
    ],
    deckId
  );
}

export default filterState;
