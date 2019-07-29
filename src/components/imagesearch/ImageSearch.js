import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import CloseRemoveButton from './CloseRemoveButton'
import ImageGrid from './ImageGrid'
import axios from 'axios'
import { Form, InputGroup } from 'react-bootstrap'
import styled from 'styled-components'

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
`

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 20px 39px 1fr;
  row-gap: 7px;
`

function imageSearch({ searchToggle, setToggle, formValue, setFormValue }) {
  const [images, setImages] = useState([])
  const [page, setPage] = useState(1)
  const [term, setSearchTerm] = useState('')
  const [prevSearchTerm, setPrevTerm] = useState('')
  const [loadingImages, setLoadingImages] = useState(false)

  function getImages(e) {
    e.preventDefault()
    if (term.length < 3) return
    if (prevSearchTerm === term) return
    setPage(1)
    setLoadingImages(true)
    axios('https://memcards.netlify.com/.netlify/functions/unsplash', {
      params: {
        page: page,
        searchTerm: term
      }
    })
      .then(res => {
        setLoadingImages(false)
        setImages(res.data.results)
      })
      .catch(() => setLoadingImages(false))

    setPrevTerm(term)
  }

  function getMoreImages() {
    const pageCount = page + 1
    axios('https://memcards.netlify.com/.netlify/functions/unsplash', {
      params: {
        page: pageCount,
        searchTerm: term
      }
    }).then(res => {
      setImages(images.concat(res.data.results))
    })
    setPage(pageCount)
  }

  function addImageFormData(image) {
    const { urls, alt_description } = image
    setFormValue({
      ...formValue,
      cardImage: { src: urls.small, alt: alt_description, thumb: urls.thumb }
    })
    setToggle(!searchToggle)
  }

  function removeImageFormData() {
    setFormValue({
      ...formValue,
      cardImage: null
    })
    setToggle(!searchToggle)
  }

  const animateSearchContainer = useSpring({
    transform: `scaleX(${searchToggle ? 1 : 0}) translateX(${
      searchToggle ? 0 : 800
    }px)`,
    transformOrigin: 'right'
  })

  return (
    <AnimatedSearchContainer className="pt-2" style={animateSearchContainer}>
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
                  value={term}
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
  )
}

export default imageSearch
