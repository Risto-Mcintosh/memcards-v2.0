import React from 'react';
import { connect } from 'react-redux';
import FlashCard from '../components/flashcard/Flashcard';
import { FlashcardProvider } from './flashcardView-context';
import Layout from '../components/Layout';
import FlipCard from '../components/FlipCard';
import Loading from '../components/loading';
import { useDeck } from '../utils/useClient';
import { useParams, Redirect } from 'react-router-dom';
import useFlashcard from '../utils/useFlashcard';
import DeckCompleted from '../components/DeckCompleted';

function Flashcard(props) {
  const { deck } = props;
  const { deckId } = useParams();
  const { data, isLoading, isFetchedAfterMount } = useDeck(deckId);
  const {
    flashcard,
    getCard,
    isBack,
    flipCard,
    noCardsLeftToStudy,
    setDeck,
    deckIsEmpty
  } = useFlashcard(data);
  if (noCardsLeftToStudy) {
    return <DeckCompleted deckName={deck.name} resetDeck={setDeck} />;
  }
  if (!flashcard || isLoading || !isFetchedAfterMount) {
    return <Loading />;
  }
  if (deckIsEmpty) {
    return <Redirect to="/decks" />;
  }

  return (
    <FlashcardProvider state={flashcard}>
      <Layout>
        <FlashCard flashcard={flashcard} deckName={deck.name} isBack={isBack} />
        <FlipCard flipCard={flipCard} isBack={isBack} getCard={getCard} />
      </Layout>
    </FlashcardProvider>
  );
}

function mapStateToProps(state) {
  return {
    deck: state.deck
  };
}

export default connect(mapStateToProps)(Flashcard);
