import React, { useRef, useState, useContext, useEffect } from "react";
import {
  Container,
  Row,
  Card,
  Form,
  Button,
  Image,
  Col,
} from "react-bootstrap";
import classes from "../Login/LoginPage.module.scss";
import { Link } from "react-router-dom";
import { UtilContext } from "../../contexts/UtilitiesContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import pic from "../../assets/bug.png";

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
          <h1 className='text-center m-2'>Login</h1>

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
                history.push("/projects");
              }}
            >
              Login
            </Button>
          </Form.Group>
        </Card.Body>
        <div className={classes.Text}>
          Need an account? <Link to="/register">Sign Up</Link>
        </div>
      </Card>
    </Container>
  );
}
