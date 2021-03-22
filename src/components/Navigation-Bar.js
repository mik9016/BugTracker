import { Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Bug-Tracker</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/home">
          Home
        </Nav.Link>
        <Nav.Link as={Link} to="/dashboard">
          Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/profile">
          Profile
        </Nav.Link>
        <NavDropdown title="Tickets" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.3">All Tickets</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Open Tickets</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.1">Done Tickets</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Button
        className="d-flex justify-content-end m-2"
        variant="outline-primary"
        as={Link}
        to="/register"
      >
        SignUp
      </Button>
      <Button
        className="d-flex justify-content-end"
        variant="primary"
        as={Link}
        to="/login"
      >
        Login
      </Button>
    </Navbar>
  );
}
