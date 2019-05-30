function filterDecks(allDecks, singleDeck) {
  console.log("singleDeck :", singleDeck);
  const singleDeckId = singleDeck.map(deck => deck.id);
  //if (singleDeckId.includes(undefined)) return [...singleDeck];
  const filteredDeckList = allDecks.filter(deck => deck.id !== singleDeckId[0]);
  const newDeckList = [...filteredDeckList, ...singleDeck];

  console.log("singleDeckId :", singleDeckId);
  console.log("filteredDeckList :", filteredDeckList);
  console.log("newDeckList :", newDeckList);
  return newDeckList;
}

function filterCards(allCards, deckName, singleCard) {
  if (singleCard.length > 1) return singleCard;
  const singleCardId = singleCard.map(card => card.id);
  const filteredDeck = allCards.filter(deck => deck.name === deckName);
  if (filteredDeck.length === 0) return [...singleCard];
  console.log("filteredDeck :", filteredDeck);
  const filteredCardList = filteredDeck[0].data.filter(
    card => card.id !== singleCardId[0]
  );
  const newCardList = [...filteredCardList, ...singleCard];

  console.log("singleCardId :", singleCardId);
  console.log("filteredCardList :", filteredCardList);
  console.log("newCardList :", newCardList);

  return newCardList;
}

export { filterDecks, filterCards };
