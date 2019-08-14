import React from 'react';
import { ImageAdd } from 'styled-icons/boxicons-regular/ImageAdd';
import styled from 'styled-components';

const StyledButton = styled.div`
  ${({ thumbnail }) => thumbnail
    && `
  background-image: url(${thumbnail});
    background-size: cover;
    background-position: center;
  height: 70px;
  width: 140px;
  `}
  ${({ addImage }) => addImage
    && `
  width: 70px;
`}
`;

function ImageInput({ searchToggle, setToggle, image }) {
  console.log(searchToggle);

  return (
    <StyledButton
      className="p-1 ml-2 btn btn-primary"
      onClick={() => setToggle(!searchToggle)}
      addImage={!image}
      thumbnail={image ? image.thumb : undefined}
      data-testid="image-search-toggle"
    >
      {!image ? <ImageAdd /> : null}
    </StyledButton>
  );
}

export default ImageInput;
