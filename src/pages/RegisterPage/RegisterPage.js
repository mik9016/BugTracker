import React, { useRef, useState, useContext } from "react";
import { Container,  Card, Form, Button,Alert } from "react-bootstrap";
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

  const metaObj = useContext(UtilContext);
  const dbContextContent = useContext(DbContext);
  const [       
    isAuthorized,
    Login,
    LogOut,
    Register,
    userId,
    setUserId,
    userName,
    userEmail,
    err,
    validate,
    setErr] = useContext(AuthContext);
  return (
    <Container className={classes.Register}>
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
              onClick={(e) => {
                if (
                  validate(name, "Name") &&
                  validate(email, "Email") &&
                  validate(password, "password")
                ){
                  e.preventDefault();
                  Register(email, password);
                  dbContextContent.setUserInDB(email,name);
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
