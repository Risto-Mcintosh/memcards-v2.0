import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import axios from "axios";
import { Form, InputGroup, Button } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";

const SearchContainer = styled(animated.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background-color: #ffffff;
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
    axios("http://localhost:5000/memcards-17/us-central1/memcards/api/photos", {
      params: {
        page: page,
        searchTerm: term
      }
    }).then(res => {
      console.log(res);

      setImages(res.data.results);
    });

    setPrevTerm(term);
  }

  function getMoreImages() {
    const pageCount = page + 1;
    axios("http://localhost:5000/memcards-17/us-central1/memcards/api/photos", {
      params: {
        page: pageCount,
        searchTerm: term
      }
    }).then(res => {
      console.log(res);
      setImages(images.concat(res.data.results));
    });
    setPage(pageCount);
  }

  function setFormData(image) {
    const { urls, alt_description } = image;
    setFormValue({
      ...formValue,
      cardImage: { src: urls.small, alt: alt_description }
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
    <SearchContainer style={animateSearchContainer}>
      <div className="d-flex justify-content-between px-2">
        <span className="p-0 bg-0 text-primary">Remove</span>
        <span
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
      <div id="scrollable-div" style={{ maxHeight: "100%", overflow: "auto" }}>
        <ImageGrid
          dataLength={images.length}
          hasMore={true}
          next={getMoreImages}
          scrollableTarget="scrollable-div"
          loader={<div>Loading ...</div>}
        >
          {images.map(image => (
            <img
              key={image.id}
              src={image.urls.thumb}
              alt={image.alt_description}
              onClick={() => setFormData(image)}
            />
          ))}
        </ImageGrid>
      </div>
    </SearchContainer>
  );
}

export default imageSearch;
