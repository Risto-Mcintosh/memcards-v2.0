function findId(arr, i) {
  const { id } = arr.find(item => item.id === i);
  return id;
}

function filterList(original, modified) {
  return original.filter(o => o.id !== modified);
}

function DeckFilter(allDecks, modifiedDeck, deckName) {
  return [
    ...filterList(allDecks, findId(modifiedDeck, deckName)),
    ...modifiedDeck
  ];
}

function CardFilter(allDecks, modifiedCard, deckName, cardId) {
  if (modifiedCard.length > 1 || !cardId) return modifiedCard;
  const filteredDeck = findId(allDecks, deckName);
  if (!filteredDeck || !filteredDeck.length) return [...modifiedCard];

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
