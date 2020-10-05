import React from 'react';
import { connect } from 'react-redux';
import { Link, useLocation, useRouteMatch, withRouter } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { logOutUser } from '../../service/auth';
import { deleteDeckToggle, logout } from '../../actions/actionCreator';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import DeleteToggle from './DeleteToggle';

function Navigation(props) {
  const { pathname } = useLocation();
  const match = useRouteMatch('/decks/:deckId');
  function renderDeleteButton() {
    if (pathname === '/decks' || pathname === '/') {
      return (
        <DeleteToggle
          deck={props.deck}
          deleteDeckToggle={props.deleteDeckToggle}
        />
      );
    } else if (match?.isExact && props.flashcardView) {
      return <DeleteButton />;
    } else {
      return null;
    }
  }
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
            {match?.isExact && props.flashcardView && <EditButton />}
            {renderDeleteButton()}
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
    deck: state.deck
  };
}

export default withRouter(
  connect(mapStateToProps, { deleteDeckToggle, logout })(Navigation)
);
