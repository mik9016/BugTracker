import React, { useRef, useState, useContext } from "react";
import { Container, Row, Card, Form, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "../RegisterPage/RegisterPage.module.scss";

import { UtilContext } from "../../contexts/UtilitiesContext";
import { AuthContext } from "../../contexts/AuthContext";
import { DbContext } from "../../contexts/DbContext";

export default function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [clearInput, checkLog] = useContext(UtilContext);
  const [
    CreateNewProject,
    CreateNewIssue,
    currentProject,
    getProjects,
    getIssues,
    setCurrentProject,
    statusNumHandler,
    pickedIssue,
    setPickedIssue,
    pickedIssueTitle,
    setPickedIssueTitle,
    pickedIssueStatus,
    setPickedIssueStatus,
    pickedIssueId,
    setPickedIssueId,
    changeIssueDescription,
    changeIssueStatus,
    changeIssueTitle,
    changeProjectTitle,
    pickedProject,
    setPickedProject,
    pickedProjectId,
    setPickedProjectId,
    setUserInDB,
  ] = useContext(DbContext);
  const [isAuthorized, Login, LogOut, Register] = useContext(AuthContext);
  return (
    <Container className={classes.Register}>
      <Card className={classes.Card}>
        <Card.Body>
          <h1 className="text-center mb-4">Register</h1>

          <Form>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                ref={nameRef}
                placeholder="name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                placeholder="email"
                required
                onChange={() => setEmail(emailRef.current.value)}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              className="w-100"
              type="submit"
              onClick={() => {
                Register(email, password);
                setUserInDB(email,name);
                clearInput(nameRef);
                clearInput(emailRef);
                clearInput(passwordRef);
              }}
            >
              Register
            </Button>
          </Form>
        </Card.Body>
        <div className={classes.Text}>
          Need an account? <Link to="/login">Login</Link>
        </div>
      </Card>
    </Container>
  );
}
