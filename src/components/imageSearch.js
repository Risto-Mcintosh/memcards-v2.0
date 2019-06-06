import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import axios from "axios";
import { Form, InputGroup, Button } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroller";
import styled from "styled-components";

const SearchContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background-color: #ffffff;
  display: grid;
  grid-template-rows: 60px 1fr;
  /*padding: 10px 15px;*/
`;

const ImageGrid = styled.div`
  max-height: 100%;
  display: grid;
  overflow: auto;
`;

function imageSearch() {
  const [images, setImages] = useState([]);
  const [term, setSearchTerm] = useState("");
  const [prevSearchTerm, setPrevTerm] = useState("");
  const getImages = e => {
    e.preventDefault();
    console.log(term);
    console.log(prevSearchTerm);
    if (term.length < 3) return;
    if (prevSearchTerm === term) return;
    axios("http://localhost:5000/memcards-17/us-central1/memcards/api/photos", {
      params: {
        page: 1,
        searchTerm: term
      }
    }).then(res => {
      setImages(res.data.results);
    });

    setPrevTerm(term);
  };

  return (
    <SearchContainer>
      <div style={{ paddingTop: "10px" }}>
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
      <ImageGrid>
        <InfiniteScroll hasMore={false} loader={<div>Loading ...</div>}>
          {images.map(image => (
            <img key={image.id} src={image.urls.small} />
          ))}
        </InfiniteScroll>
      </ImageGrid>
    </SearchContainer>
  );
}

export default imageSearch;
