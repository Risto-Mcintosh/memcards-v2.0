import React from 'react';
import FlashCard from '../components/flashcard/Flashcard';
import { FlashcardProvider } from './flashcardView-context';
import Layout from '../components/Layout';
import FlipCard from '../components/FlipCard';
import Loading from '../components/loading';
import { useFlashcards } from '../utils/client';
import { useParams, Redirect } from 'react-router-dom';
import useFlashcard from '../utils/useFlashcard';
import DeckCompleted from '../components/DeckCompleted';
import EditCard from '../components/addEditForm/EditCard';

function Flashcard() {
  const { deckId } = useParams();
  const { data, isLoading, isFetchedAfterMount } = useFlashcards(deckId);
  const {
    flashcard,
    nextCard,
    clearCard,
    showBackOfCard,
    flipCard,
    noCardsLeftToStudy,
    initializeDeck,
    deckIsEmpty,
    isEditing,
    editFlashcard
  } = useFlashcard(data?.cards);

  if (noCardsLeftToStudy) {
    return (
      <DeckCompleted deckName={data?.deckName} resetDeck={initializeDeck} />
    );
  }

  if (deckIsEmpty && isFetchedAfterMount) {
    return <Redirect to="/decks" />;
  }

  if (!flashcard || isLoading) {
    return <Loading />;
  }

  return (
    <FlashcardProvider
      state={{ deckName: data.deckName, flashcard, editFlashcard, clearCard }}
    >
      <Layout flashcardView>
        {isEditing ? (
          <EditCard editFlashcard={editFlashcard} />
        ) : (
          <>
            <FlashCard
              flashcard={flashcard}
              deckName={data?.deckName}
              showBackOfCard={showBackOfCard}
            />
            <FlipCard
              flipCard={flipCard}
              showBackOfCard={showBackOfCard}
              nextCard={nextCard}
            />
          </>
        )}
      </Layout>
    </FlashcardProvider>
  );
}

export default Flashcard;
