import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  const logout = () => {
    localStorage.setItem('authenticated', false);
  };

  return (
    <Navbar bg="dark" expand="md" variant="dark">
      <Navbar.Brand>
        <i class="fas fa-tasks fa-1x" style={{ color: 'white' }}></i>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Link to="/home" style={{ color: 'white' }}>
            Home
          </Link>
          <Link
            to="/"
            className="ml-4"
            style={{ color: 'white' }}
            onClick={logout}
          >
            <i className="fas fa-sign-out-alt"></i>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
