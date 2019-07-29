import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import styled from 'styled-components'
import { Spinner } from 'react-bootstrap'
import PropTypes from 'prop-types'

const Grid = styled(InfiniteScroll)`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: 155px;

  img {
    width: 100%;
    object-fit: cover;
    height: 100%;
  }
`

export default function ImageGrid({
  getMoreImages,
  addImageFormData,
  images,
  loadingImages
}) {
  return (
    <div id="scrollable-div" style={{ maxHeight: '100%', overflow: 'auto' }}>
      <Grid
        dataLength={images.length}
        hasMore={true}
        next={getMoreImages}
        scrollableTarget="scrollable-div"
      >
        {loadingImages && (
          <Spinner
            className="mx-auto"
            style={{ height: '50px', width: '50px' }}
            animation="border"
            variant="success"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        {images.map(image => (
          <img
            key={image.id}
            src={image.urls.small}
            alt={image.alt_description}
            onClick={() => addImageFormData(image)}
          />
        ))}
      </Grid>
    </div>
  )
}

ImageGrid.propTypes = {
  getMoreImages: PropTypes.func.isRequired,
  addImageFormData: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  loadingImages: PropTypes.bool.isRequired
}
