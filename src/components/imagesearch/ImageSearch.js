import React, { useState } from 'react';
import getImagesFromUnsplash from '../../service/unsplash';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import { Form, InputGroup } from 'react-bootstrap';
import styled from 'styled-components';
import CloseRemoveButton from './CloseRemoveButton';
import ImageGrid from './ImageGrid';

const AnimatedSearchContainer = styled(animated.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background-color: #ffffff;

  @media (min-width: 768px) {
    width: 55%;
  }
`;

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 20px 39px 1fr;
  row-gap: 7px;
`;

function ImageSearch({ searchToggle, setToggle, formValue, setFormValue }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [prevSearchTerm, setPrevTerm] = useState('');
  const [loadingImages, setLoadingImages] = useState(false);

  function getImages(e) {
    e.preventDefault();
    if (searchTerm.length < 3) return;
    if (prevSearchTerm === searchTerm) return;
    setLoadingImages(true);
    getImagesFromUnsplash(page, searchTerm)
      .then(res => {
        setLoadingImages(false);
        setImages(res.data.results);
      })
      .catch(() => setLoadingImages(false));

    setPrevTerm(searchTerm);
  }

  function getMoreImages() {
    const pageCount = page + 1;
    getImagesFromUnsplash(pageCount, searchTerm).then(res => {
      setImages(images.concat(res.data.results));
    });
    setPage(pageCount);
  }

  function addImageFormData(image) {
    const { urls, alt_description: alt } = image;
    setFormValue({
      ...formValue,
      cardImage: { src: urls.small, alt, thumb: urls.thumb }
    });
    setToggle(!searchToggle);
  }

  function removeImageFormData() {
    setFormValue({
      ...formValue,
      cardImage: null
    });
    setToggle(!searchToggle);
  }

  const animateSearchContainer = useSpring({
    transform: `scaleX(${searchToggle ? 1 : 0}) translateX(${
      searchToggle ? 0 : 800
    }px)`,
    transformOrigin: 'right'
  });

  return (
    <AnimatedSearchContainer
      className="pt-2"
      style={animateSearchContainer}
      data-testid="image-search-container"
    >
      <StyledContainer className="container">
        <div className="d-flex justify-content-between px-2">
          <CloseRemoveButton
            ariaLabel="Remove Image"
            text="Remove"
            fn={removeImageFormData}
          />
          <CloseRemoveButton
            ariaLabel="Close image search window"
            text="Close"
            fn={setToggle}
            fnParam={searchToggle}
          />
        </div>
        <div>
          <Form onSubmit={getImages}>
            <Form.Group controlId="imageSearch">
              <Form.Label className="sr-only">Search Unsplash</Form.Label>
              <InputGroup>
                <Form.Control
                  onChange={e => setSearchTerm(e.target.value)}
                  value={searchTerm}
                  type="text"
                  className="rounded-0"
                  placeholder="Search Images"
                />
              </InputGroup>
            </Form.Group>
          </Form>
        </div>
        <ImageGrid
          getMoreImages={getMoreImages}
          addImageFormData={addImageFormData}
          images={images}
          loadingImages={loadingImages}
        />
      </StyledContainer>
    </AnimatedSearchContainer>
  );
}

export default ImageSearch;

ImageSearch.propTypes = {
  searchToggle: PropTypes.bool.isRequired,
  setToggle: PropTypes.func.isRequired,
  formValue: PropTypes.shape({
    deckName: PropTypes.string,
    frontOfCard: PropTypes.string,
    backOfCard: PropTypes.string,
    cardImage: PropTypes.object
  }),
  setFormValue: PropTypes.func.isRequired
};

ImageSearch.defaultProps = {
  formValue: {}
};
