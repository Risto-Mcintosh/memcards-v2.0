import React from 'react';
import PropTypes from 'prop-types';
import { Edit } from 'styled-icons/material/Edit';
import { Link } from 'react-router-dom';

export default function editButton({ card, deck, match }) {
  if (match.path !== '/deck/:deckName' || deck.editable === false) {
    return null;
  }
  return (
    <Link
      className="text-white mr-2"
      to={{
        pathname: `/edit/card/${card.id}`,
        state: { selectedDeckName: deck.name }
      }}
    >
      <Edit style={{ width: '30px' }} />
    </Link>
  );
}

editButton.propTypes = {
  card: PropTypes.object.isRequired,
  deck: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
