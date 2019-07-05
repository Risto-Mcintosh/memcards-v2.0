import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import axios from "axios";
import { Form, InputGroup } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";

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

const ImageGrid = styled(InfiniteScroll)`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: 155px;

  img {
    width: 100%;
    object-fit: cover;
    height: 100%;
  }
`;

function imageSearch({ searchToggle, setToggle, formValue, setFormValue }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [term, setSearchTerm] = useState("");
  const [prevSearchTerm, setPrevTerm] = useState("");

  function getImages(e) {
    e.preventDefault();
    if (term.length < 3) return;
    if (prevSearchTerm === term) return;
    setPage(1);
    axios("https://memcards.netlify.com/.netlify/functions/unsplash", {
      params: {
        page: page,
        searchTerm: term
      }
    }).then(res => {
      setImages(res.data.results);
    });

    setPrevTerm(term);
  }

  function getMoreImages() {
    const pageCount = page + 1;
    axios("https://memcards.netlify.com/.netlify/functions/unsplash", {
      params: {
        page: pageCount,
        searchTerm: term
      }
    }).then(res => {
      setImages(images.concat(res.data.results));
    });
    setPage(pageCount);
  }

  function addImageFormData(image) {
    const { urls, alt_description } = image;
    setFormValue({
      ...formValue,
      cardImage: { src: urls.small, alt: alt_description, thumb: urls.thumb }
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
    transformOrigin: "right"
  });

  return (
    <AnimatedSearchContainer className="pt-2" style={animateSearchContainer}>
      <StyledContainer className="container">
        <div className="d-flex justify-content-between px-2">
          <span
            style={{ WebkitAppearance: "none", MozAppearance: "none" }}
            type="button"
            aria-label="Remove Image"
            className="p-0 bg-0 text-primary"
            onClick={() => removeImageFormData()}
          >
            Remove
          </span>
          <span
            style={{ WebkitAppearance: "none", MozAppearance: "none" }}
            type="button"
            aria-label="Close"
            className="p-0 bg-0 text-primary"
            onClick={() => setToggle(!searchToggle)}
          >
            Close
          </span>
        </div>
        <div>
          <Form onSubmit={getImages}>
            <Form.Group controlId="imageSearch">
              <Form.Label className="sr-only">Search Unsplash</Form.Label>
              <InputGroup>
                <Form.Control
                  onChange={e => setSearchTerm(e.target.value)}
                  value={term}
                  type="text"
                  className="rounded-0"
                  placeholder="Search Images"
                />
              </InputGroup>
            </Form.Group>
          </Form>
        </div>
        <div
          id="scrollable-div"
          style={{ maxHeight: "100%", overflow: "auto" }}
        >
          <ImageGrid
            dataLength={images.length}
            hasMore={true}
            next={getMoreImages}
            scrollableTarget="scrollable-div"
          >
            {images.map(image => (
              <img
                key={image.id}
                src={image.urls.small}
                alt={image.alt_description}
                onClick={() => addImageFormData(image)}
              />
            ))}
          </ImageGrid>
        </div>
      </StyledContainer>
    </AnimatedSearchContainer>
  );
}

export default imageSearch;
