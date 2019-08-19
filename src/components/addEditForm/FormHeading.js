import React from 'react';
import PropTypes from 'prop-types';

const createNewDeck = (
  <>
    <h1>Create New Deck</h1>
    <p className="m-0">Name your new deck and create your first flashcard!</p>
  </>
);

const addNewCard = <h1>Add New Card</h1>;

const editCard = <h1>Edit Card</h1>;

export default function FormHeading({ url }) {
  let heading;
  if (url === '/add/newdeck') {
    heading = createNewDeck;
  } else if (url === '/add/card') {
    heading = addNewCard;
  } else {
    heading = editCard;
  }

  return (
    <div data-testid="form-heading" className="px-1 text-center">
      {heading}
    </div>
  );
}

FormHeading.propTypes = {
  url: PropTypes.string.isRequired
};
