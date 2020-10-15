import React from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useAuth } from 'context/auth-context';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import DeleteToggle from './DeleteToggle';

function Navigation({ flashcardView }) {
  const { pathname } = useLocation();
  const { logout } = useAuth();

  const match = useRouteMatch('/decks/:deckId');
  function renderDeleteButton() {
    if (pathname === '/decks' || pathname === '/') {
      return <DeleteToggle />;
    } else if (match?.isExact && flashcardView) {
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
            <Nav.Link
              className="text-white mr-2"
              as={Link}
              to="/decks"
              data-testid="link-to-home"
            >
              Decks
            </Nav.Link>
            {match?.isExact && flashcardView && <EditButton />}
            {renderDeleteButton()}
            <Nav.Link
              className="text-white px-1"
              as={Button}
              aria-label="logout"
              variant="secondary"
              onClick={() => logout()}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
