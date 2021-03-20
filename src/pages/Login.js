import React, { useRef, useState, useContext } from "react";
import { Container, Row, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UtilContext } from "../contexts/UtilitiesContext";
import {AuthContext} from '../contexts/AuthContext';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clearInput, checkLog] = useContext(UtilContext);
  const [isAuthorized, Login, LogOut, Register] = useContext(AuthContext)

  return (
    <div>
      <Container className="m-2 w-75 ">
        <>
          <Card>
            <Card.Body>
              <h1 className="text-center mb-4">Login</h1>

              <Form>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button
                  className="w-100"
                  type="submit"
                  onClick={() => {
                    checkLog(email, password);
                    Login(email, password);
                    clearInput(emailRef);
                    clearInput(passwordRef);
                  }}
                >
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/register">Sign Up</Link>
          </div>
        </>
      </Container>
    </div>
  );
}
