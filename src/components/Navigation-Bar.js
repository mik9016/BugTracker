import { Navbar, Nav, Button } from "react-bootstrap";
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
