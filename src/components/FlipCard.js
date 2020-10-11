import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

export default function FlipCard({ flipCard, showBackOfCard, nextCard }) {
  return (
    <Container fluid className=" bg-primary">
      <Row className="h-100 mx-n3 d-flex justify-content-center">
        <Col className=" col-12 col-md-8 p-0">
          {showBackOfCard ? (
            <Button
              data-testid="flip-card"
              className="rounded-0 w-100 h-100"
              onClick={() => {
                nextCard();
              }}
              variant="secondary"
            >
              Next Card
            </Button>
          ) : (
            <Button
              data-testid="flip-card"
              className="rounded-0 w-100 h-100"
              onClick={() => flipCard()}
              variant="secondary"
            >
              Show Answer
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}
