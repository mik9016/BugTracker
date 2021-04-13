import { Navbar, Nav, Button, Image } from "react-bootstrap";
import classes from "../NavigationBar/NavigationBar.module.scss";
import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Bug from "../../assets/bug.png";
import Pic from "../../assets/handwhite.svg";
import { AuthContext } from "../../contexts/AuthContext";
import { TeamContext } from "../../contexts/TeamContext";
import { DbContext } from "../../contexts/DbContext";
import useGetUsers from "../../Hooks/useGetUsers";

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
  const teamContextContent = useContext(TeamContext);
  const dbContextContent = useContext(DbContext);
  const users = useGetUsers();
  let flag = false;

  // if(isAuthorized){
  //   flag=!flag;
  // }

  const [currentUserName, setCurrentUserName] = useState("");

  const getUserInfos = () => {
    users.map((user) => {
      if (user.userEmail === userEmail) {
        dbContextContent.setLoggedUserEmail(user.userEmail);
        dbContextContent.setLoggedUserPhoto(user.photo);
        dbContextContent.setLoggedUserName(user.userName);
        dbContextContent.setLoggedUserId(user.id);
        return;
      }
    });
  };

  const getUserName = (arr) => {
    arr.map((user) => {
      if (user.userEmail === userEmail) {
        setCurrentUserName(user.userName);
        console.log(currentUserName);
      }
    });
  };

  const history = useHistory();

  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Navbar.Brand as={Link} to="/projects">
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
            <Nav.Link
              as={Link}
              to="/projects"
              className={classes.Links}
              onClick={() => {
                teamContextContent.setLoggedUserisManager(false);
              }}
            >
              Projects
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/profile"
              className={classes.Links}
              onClick={() => {
                getUserInfos();
              }}
            >
              Profile
            </Nav.Link>

            <Image
       
              src={Pic}
              roundedCircle
              className={classes.Pic}
            />
            <Navbar.Text className={classes.LoggedAs}>
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
