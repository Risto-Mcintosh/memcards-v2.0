import React from "react";
import { ImageAdd } from "styled-icons/boxicons-regular/ImageAdd";
import { Button } from "react-bootstrap";
import styled, { css } from "styled-components";

const StyledButton = styled(Button)`
  ${({ thumbnail }) =>
    thumbnail &&
    `
  background-image: url(${thumbnail});
    background-size: cover;
    background-position: center;
  height: 70px;
  width: 140px;
  `}
  ${({ addImage }) =>
    addImage &&
    `
  width: 70px;
`}
`;

function imageInput({ searchToggle, setToggle, image }) {
  return (
    <StyledButton
      className="p-1 ml-2"
      onClick={() => setToggle(!searchToggle)}
      addImage={!image ? true : false}
      thumbnail={image ? image.thumb : undefined}
    >
      {!image ? <ImageAdd /> : null}
    </StyledButton>
  );
}

export default imageInput;
