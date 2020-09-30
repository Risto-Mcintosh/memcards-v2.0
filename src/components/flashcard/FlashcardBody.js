import React from 'react';
import { animated } from 'react-spring';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CardBody = styled(animated.div)`
  display: grid;
  align-items: center;
  justify-items: center;
  height: 100%;
  width: 100%;
  text-align: center;
  position: absolute;
  padding: 0px 2px;
  h3 {
    margin: 0;
  }
`;

const FlashcardBody = ({ cardText, cardImage, style }) => (
  <CardBody
    className="bg-light border shadow"
    data-testid="flashcard"
    style={style}
  >
    <h3>{cardText}</h3>
    {!cardImage ? null : (
      <div>
        <img
          src={cardImage.src}
          alt={cardImage.alt}
          style={{ width: '100%', padding: '0px 4px' }}
        />
      </div>
    )}
  </CardBody>
);

export default FlashcardBody;

FlashcardBody.propTypes = {
  cardText: PropTypes.string,
  cardImage: PropTypes.object,
  style: PropTypes.object.isRequired
};

FlashcardBody.defaultProps = {
  cardText: '',
  cardImage: null
};
