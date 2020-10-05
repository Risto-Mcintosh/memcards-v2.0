import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Navigation from './navigation/Navigation';

const GridLayout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 70px 1fr 54px;

  @media (min-width: 992px) {
    grid-template-rows: 88px 1fr 70px;
  }
`;

export default function Layout({ children, flashcardView }) {
  return (
    <GridLayout>
      <Navigation flashcardView={flashcardView} />
      {children}
    </GridLayout>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};
