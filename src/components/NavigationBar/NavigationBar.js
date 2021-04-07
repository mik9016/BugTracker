import { Navbar, Nav, Button, NavDropdown, Image } from "react-bootstrap";
import classes from "../NavigationBar/NavigationBar.module.scss";
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Bug from "../../assets/bug.png";
import Pic from "../../assets/pic.jpg";
import { AuthContext } from "../../contexts/AuthContext";

export default function NavigationBar() {
  const [
    isAuthorized,
    Login,
    LogOut,
    Register,
    userId,
    setUserId,
    userName,
    userEmail,
  ] = useContext(AuthContext);

  const history = useHistory();

  return (
    <Navbar bg="light" variant="light" expand="lg">
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
      <Navbar.Toggle aria-controls="navbar" />
      <Navbar.Collapse id="navbar">
        {isAuthorized && (
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/projects" className={classes.Links}>
              Projects
            </Nav.Link>
            <Nav.Link as={Link} to="/profile" className={classes.Links}>
              Profile
            </Nav.Link>

            <Image src={Pic} roundedCircle className={classes.Pic} />
            <Navbar.Text className={classes.Links}>
              Signed in as: {userEmail}
            </Navbar.Text>
            <Button
              className={classes.LogoutBtn}
              onClick={() => {
                LogOut();

                history.push("/");
              }}
            >
              LogOut
            </Button>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
