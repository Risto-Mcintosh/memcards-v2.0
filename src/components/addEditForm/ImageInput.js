import React from 'react';
import { ImageAdd } from 'styled-icons/boxicons-regular/ImageAdd';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  ${({ thumbnail }) => thumbnail
    && `
  background-image: url(${thumbnail});
    background-size: cover;
    background-position: center;
  height: 70px;
  width: 140px;
  `}
  ${({ addimage }) => addimage
    && `
  width: 70px;
`}
`;

function ImageInput({ searchToggle, setToggle, image }) {
  return (
    <StyledButton
      className="p-1 ml-2"
      onClick={() => setToggle(!searchToggle)}
      addimage={!image}
      thumbnail={image ? image.thumb : undefined}
    >
      {!image ? <ImageAdd /> : null}
    </StyledButton>
  );
}

export default ImageInput;
