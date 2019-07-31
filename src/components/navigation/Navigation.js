import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { deleteDeckToggle, deleteCard } from '../../actions/actionCreator';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

function Navigation(props) {
  return (
    <>
      <Navbar className="position-relative" bg="primary" expand="lg">
        <Container>
          <Navbar.Brand className="text-white" as={Link} to="/">
            Memcards
          </Navbar.Brand>
          <Nav className=" flex-row align-items-center">
            <Nav.Link className="text-white mr-2" as={Link} to="/decks">
              Decks
            </Nav.Link>
            <EditButton {...props} />
            <DeleteButton {...props} />
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

function mapStateToProps(state) {
  return {
    editableDecks: state.decks.some(deck => deck.editable === true),
    deck: state.deck,
    card: state.card
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { deleteDeckToggle, deleteCard }
  )(Navigation)
);
