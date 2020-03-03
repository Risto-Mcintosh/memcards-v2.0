import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { logOutUser } from '../../service/auth';
import {
  deleteDeckToggle,
  deleteCard,
  getCard,
  logout
} from '../../actions/actionCreator';
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
            <Nav.Link
              className="text-white px-1"
              as={Button}
              aria-label="logout"
              variant="secondary"
              onClick={async () => {
                await logOutUser();
                props.logout();
              }}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

function mapStateToProps(state) {
  return {
    deck: state.deck,
    card: state.card
  };
}

export default withRouter(
  connect(mapStateToProps, { deleteDeckToggle, deleteCard, getCard, logout })(
    Navigation
  )
);
