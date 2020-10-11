import React from 'react';
import { Container } from 'react-bootstrap';
import { useSpring } from 'react-spring';
import styled from 'styled-components';
import FlashcardBody from './FlashcardBody';

const StyledContainer = styled(Container)`
  width: 60%;

  @media screen and (min-width: 768px) {
    max-width: 37%;
  }
`;

export default function FlashCard({ flashcard, deckName, showBackOfCard }) {
  const { transform } = useSpring({
    transform: `perspective(600px) rotateY(${showBackOfCard ? 180 : 0}deg)`
  });

  return (
    <Container
      fluid
      className="d-flex justify-content-center position-relative"
    >
      <h1 className="position-absolute text-center mt-2">{deckName}</h1>
      <StyledContainer className="d-flex h-100 flex-column justify-content-center align-items-center mx-auto">
        <div
          className="position-relative"
          style={{ width: '250px', height: '250px' }}
        >
          {flashcard && (
            <>
              <FlashcardBody
                cardText={flashcard.front}
                style={{ transform, backfaceVisibility: 'hidden' }}
              />
              <FlashcardBody
                cardText={flashcard.back}
                cardImage={flashcard.image}
                style={{
                  transform: transform.interpolate(
                    (t) => `${t} rotateY(180deg)`
                  ),
                  opacity: showBackOfCard ? 1 : 0
                }}
              />
            </>
          )}
        </div>
      </StyledContainer>
    </Container>
  );
}
