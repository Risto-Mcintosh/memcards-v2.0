import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSpring, animated } from "react-spring";
import axios from "axios";
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
  min-height: 111px;
  height: 100%;
  width: 100%;
  text-align: center;
  position: absolute;
  @media screen and (min-width: 768px) {
    min-height: 150px;
  }
`;

export default function FlashCard({ card, deckName }) {
  const { transform } = useSpring({
    transform: `perspective(600px) rotateY(${card.cardSide ? 180 : 0}deg)`
  });

  const [image, setImage] = useState("");
  useEffect(() => {
    const fetch = async () => {
      const results = await axios(
        `https://api.unsplash.com/photos/random?client_id=${CL_ID}`
      );
      setImage(results.data.urls.small);
    };
    fetch();
  }, []);

  return (
    <Container
      fluid
      className="d-flex justify-content-center position-relative"
    >
      <h1 className="position-absolute text-center mt-2">{deckName}</h1>
      <StyledContainer className="d-flex h-100 flex-column justify-content-center align-items-center mx-auto">
        <div className="position-relative w-100 h-25">
          <FlashCardBody
            className="bg-light border shadow"
            style={{
              transform: transform.interpolate(t => `${t} rotateY(180deg)`),
              opacity: card.cardSide ? 1 : 0
            }}
          >
            <h3>{card.back}</h3>
          </FlashCardBody>
          <FlashCardBody
            className="bg-light border shadow"
            style={{ transform, backfaceVisibility: "hidden" }}
          >
            <h3>{card.front}</h3>
            <img src={image} alt="" />
          </FlashCardBody>
        </div>
      </StyledContainer>
    </Container>
  );
}
