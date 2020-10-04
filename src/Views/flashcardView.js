import React from 'react';
import { connect } from 'react-redux';
import FlashCard from '../components/flashcard/Flashcard';
import { FlashcardProvider } from './flashcardView-context';
import Layout from '../components/Layout';
import FlipCard from '../components/FlipCard';
import { flipCard, setCurrentDeck } from '../actions/actionCreator';
import Loading from '../components/loading';
import { useDeck } from '../utils/useClient';
import { useParams, Redirect } from 'react-router-dom';
import useFlashcard from '../utils/useFlashcard';

function Flashcard(props) {
  const { deck } = props;
  const { deckId } = useParams();
  const { data, isLoading } = useDeck(deckId);
  const {
    card,
    getCard,
    isBack,
    flipCard,
    noCardsLeftToStudy,
    deckIsEmpty
  } = useFlashcard(data);
  if (noCardsLeftToStudy) {
    return <Redirect to="/completed" />;
  }
  if (!card || isLoading) {
    return <Loading />;
  }
  if (deckIsEmpty) {
    return <Redirect to="/" />;
  }

  return (
    <FlashcardProvider state={card}>
      <Layout>
        <FlashCard card={card} deckName={deck.name} isBack={isBack} />
        <FlipCard
          {...props}
          flipCard={flipCard}
          isBack={isBack}
          getCard={getCard}
        />
      </Layout>
    </FlashcardProvider>
  );
}

function mapStateToProps(state) {
  return {
    decks: state.decks,
    deck: state.deck,
    card: state.card
  };
}
const mapDispatchToProps = {
  flipCard,
  setCurrentDeck
};

export default connect(mapStateToProps, mapDispatchToProps)(Flashcard);
