import React from "react";
import { Container } from "react-bootstrap";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";

const StyledContainer = styled(Container)`
  width: 60%;

  @media screen and (min-width: 768px) {
    max-width: 37%;
  }
`;

const FlashCardBody = styled(animated.div)`
  display: grid;
  place-items: center;
  height: 100%;
  width: 100%;
  text-align: center;
  position: absolute;
  padding: 0px 2px;
  h3 {
    margin: 0;
  }
`;

export default function FlashCard({ card, deckName }) {
  const { transform } = useSpring({
    transform: `perspective(600px) rotateY(${card.cardSide ? 180 : 0}deg)`
  });

  return (
    <Container
      fluid
      className="d-flex justify-content-center position-relative"
    >
      <h1 className="position-absolute text-center mt-2">{deckName}</h1>
      <StyledContainer className="d-flex h-100 flex-column justify-content-center align-items-center mx-auto">
        <div
          className={`position-relative`}
          style={{ width: "250px", height: "250px" }}
        >
          <FlashCardBody
            className="bg-light border shadow"
            style={{
              transform: transform.interpolate(t => `${t} rotateY(180deg)`),
              opacity: card.cardSide ? 1 : 0
            }}
          >
            <h3>{card.back}</h3>
            <div>
              {/* <img
                src={image}
                alt=""
                style={{ width: "100%", padding: "0px 4px" }}
              /> */}
            </div>
          </FlashCardBody>
          <FlashCardBody
            className="bg-light border shadow"
            style={{ transform, backfaceVisibility: "hidden" }}
          >
            <h3>{card.front}</h3>
          </FlashCardBody>
        </div>
      </StyledContainer>
    </Container>
  );
}
