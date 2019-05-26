import React from "react";
import styled from "styled-components";
import Navigation from "./navigation/Navigation";

const GridLayout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 70px 1fr 54px;

  @media (min-width: 992px) {
    grid-template-rows: 88px 1fr 70px;
  }
`;

export default function Layout({ children }) {
  return (
    <GridLayout>
      <Navigation />
      {children}
    </GridLayout>
  );
}
