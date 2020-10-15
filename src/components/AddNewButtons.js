import React, { useState } from 'react';
import styled from 'styled-components';
import { AddCircle } from '@styled-icons/material/AddCircle';
import { Folder } from '@styled-icons/fa-solid/Folder';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 16px;
  text-align: right;
  display: flex;
  align-items: center;
  flex-direction: column;
  svg {
    width: 60px;
  }
`;

export default function AddNewButtons() {
  const [show, toggle] = useState(false);

  const ShowButtonsSpring = useSpring({
    opacity: show ? 1 : 0,
    transform: `scaleY(${show ? 1 : 0}) translateY(${show ? 0 : 70}px)`,
    transformOrigin: 'bottom'
  });

  const SpinButtonSpring = useSpring({
    transform: `rotate(${show ? 140 : 0}deg) `
  });
  const AnimatedAddCircle = animated(AddCircle);

  return (
    <ButtonContainer>
      <animated.div style={ShowButtonsSpring}>
        <div className=" d-flex mb-2 position-relative">
          <p
            style={{ width: 'max-content', right: '36px', top: '4px' }}
            className=" m-0 bg-dark text-white px-1 position-absolute"
          >
            Add new deck
          </p>
          <Link to="/add/deck" style={{ width: '32px' }}>
            <Folder style={{ width: '100%' }} />
          </Link>
        </div>
        <div className=" d-flex align-items-center mb-2 position-relative">
          <p
            style={{ width: 'max-content', right: '36px', top: '4px' }}
            className="m-0 bg-dark text-white px-1 position-absolute"
          >
            Add cards
          </p>
          <Link
            to="/add/card"
            className="text-primary"
            style={{
              width: '32px',
              pointerEvents: 'auto'
            }}
          >
            <AddCircle style={{ width: '100%' }} />
          </Link>
        </div>
      </animated.div>
      <AnimatedAddCircle
        data-testid="add-new-button"
        style={SpinButtonSpring}
        onClick={() => toggle(!show)}
        className="text-primary"
      />
    </ButtonContainer>
  );
}
