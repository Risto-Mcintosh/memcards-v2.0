import React from 'react';
import {
 Button, Container, Row, Col 
} from 'react-bootstrap';

export default function FlipCard({ flipCard, card, getCard }) {
  return (
    <Container fluid className=" bg-primary">
      <Row className="h-100 mx-n3 d-flex justify-content-center">
        <Col className=" col-12 col-md-8 p-0">
          {!card.cardSide ? (
            <Button
              className="rounded-0 w-100 h-100"
              onClick={() => flipCard(card.cardSide)}
              variant="secondary"
            >
              Show Answer
            </Button>
          ) : (
            <Button
              className="rounded-0 w-100 h-100"
              onClick={() => {
                flipCard(card.cardSide);
                getCard('random');
              }}
              variant="secondary"
            >
              Next Card
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}
