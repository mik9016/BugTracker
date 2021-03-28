import React, { useRef, useState, useContext } from "react";
import { Container, Row, Card, Form, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UtilContext } from "../../contexts/UtilitiesContext";
import { AuthContext } from "../../contexts/AuthContext";
import classes from "../Login/LoginPage.module.scss";
import { useHistory } from "react-router-dom";


export default function LoginPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clearInput, checkLog] = useContext(UtilContext);
  const [isAuthorized, Login, LogOut, Register] = useContext(AuthContext);
  const history = useHistory();

  return (
    <Container className={classes.Login}>
     
      <Card className={classes.Card}>
        <Card.Body>
          <h1 className="text-center mb-4">Login</h1>

          <Form.Group>
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
              onClick={() => {
                Login(email, password);
                clearInput(emailRef);
                clearInput(passwordRef);
                history.push('/projects');
              }}
            >
              Login
            </Button>
          </Form.Group>
        </Card.Body>
        <div>
          Need an account? <Link to="/register">Sign Up</Link>
        </div>
      </Card>

    
    </Container>
  );
}
