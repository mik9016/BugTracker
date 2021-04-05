import { Navbar, Nav, Button, NavDropdown, Image } from "react-bootstrap";
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Bug from "../../assets/bug.png";
import Pic from "../../assets/pic.jpg";
import { AuthContext } from "../../contexts/AuthContext";
import classes from "../NavigationBar/NavigationBar.module.scss";

export default function NavigationBar() {
  const [isAuthorized, Login, LogOut, Register] = useContext(AuthContext);

  const history = useHistory();
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand as={Link} to="/home">
        <img
          alt=""
          src={Bug}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        Buggy
      </Navbar.Brand>
      {isAuthorized && (
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/projects">
            Projects
          </Nav.Link>
          <Nav.Link as={Link} to="/profile">
            Profile
          </Nav.Link>

          <NavDropdown title="Tickets" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.3">All Tickets</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Open Tickets</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.1">Done Tickets</NavDropdown.Item>
          </NavDropdown>
          <Button
            className=""
            onClick={() => {
              LogOut();

              history.push("/");
            }}
          >
            LogOut
          </Button>
          <Image src={Pic} roundedCircle className={classes.Pic} />
        </Nav>
      )}
    </Navbar>
  );
}
