import React, { useRef, useState, useContext } from "react";
import { Container, Card, Form, Button, Alert, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "../RegisterPage/RegisterPage.module.scss";
import { useHistory } from "react-router-dom";

import { UtilContext } from "../../contexts/UtilitiesContext";
import { AuthContext } from "../../contexts/AuthContext";
import { DbContext } from "../../contexts/DbContext";

export default function Register() {
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const metaObj = useContext(UtilContext);
  const dbContextContent = useContext(DbContext);
  // const authContextContent = useContext(AuthContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [
    isAuthorized,
    Login,
    LogOut,
    Register,
    userId,
    setUserId,
    userName,
    userEmail,
    setErr,
    err,
    validateEmail,
    validate,
    loading,
    setLoading,
  ] = useContext(AuthContext);

  return (
    <Container className={classes.Register}>
       <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Alert variant="success">You have registered successfully now go to Login</Alert>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={() => {
                handleClose();
                history.push('/login');
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <Card className={classes.Card}>
        <Card.Body>
          <h1 className="text-center mb-4">Register</h1>

          <Form>
            {err && (
              <Alert className="mt-4" variant="danger">
                {err}
              </Alert>
            )}
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
                onChange={(e) => setEmail(e.target.value)}
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
              onClick={(e) => {
                if (
                  validate(name, "Name") &&
                  validateEmail(email) &&
                  validate(password, "password")
                ) {
                  e.preventDefault();
                  setErr("");
                  Register(email, password);
                  dbContextContent.setUserInDB(email, name);
                  handleShow();
                  metaObj.clearInput(nameRef);
                  metaObj.clearInput(emailRef);
                  metaObj.clearInput(passwordRef);
                  
                }
              }}
            >
              Register
            </Button>
          </Form>
        </Card.Body>
        <div className={classes.Text}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </Card>
    </Container>
  );
}
