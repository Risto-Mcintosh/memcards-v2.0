export function findId(arr, i) {
  return arr.find(item => item.id === i);
}

export function filterList(original, modified) {
  return original.filter(o => o.id !== modified.id);
}

function DeckFilter(allDecks, modifiedDeck, deckName) {
  return [
    ...filterList(allDecks, findId(modifiedDeck, deckName)),
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

function filterState(currState, deckName, cardData, cardId) {
  return DeckFilter(
    currState,
    [
      {
        id: deckName,
        name: deckName,
        editable: true,
        data: CardFilter(currState, cardData, deckName, cardId)
      }
    ],
    deckName
  );
}

export default filterState;
