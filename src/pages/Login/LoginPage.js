import React, { useRef, useState, useContext, useEffect } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
  Modal,
} from "react-bootstrap";
import classes from "../Login/LoginPage.module.scss";
import { Link } from "react-router-dom";
import { UtilContext } from "../../contexts/UtilitiesContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function LoginPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const metaObj = useContext(UtilContext);
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

  const history = useHistory();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleSubmit() {
    console.log(typeof err);

    if (validateEmail(email) && validate(password, "password")) {
      metaObj.clearInput(emailRef);
      metaObj.clearInput(passwordRef);
      await Login(email, password);
      await console.log(err);
      history.push("/projects");
    } else {
      console.log(err);
      // setErr(null);
    }
  }

  return (
    <Container className={classes.Login}>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Alert variant="success">
            You have registered successfully now go to Login
          </Alert>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={() => {
                handleClose();
                history.push("/projects");
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <Card className={classes.Card}>
        <Form>

    
        <Card.Body>
          <h1 className="text-center m-2">Login</h1>
          <Form.Group>
            {err && (
              <Alert className="mt-4" variant="danger">
                {err}
              </Alert>
            )}
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                placeholder="email"
                autoComplete="off"
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
                autoComplete="off"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              className="w-100"
              type="submit"
              onClick={() => {
                handleSubmit();
              }}
            >
              Login
            </Button>
          </Form.Group>
        </Card.Body>
        <div className={classes.Text}>
          Need an account? <Link to="/register">Sign Up</Link>
        </div>
        </Form>
      </Card>
    </Container>
  );
}
