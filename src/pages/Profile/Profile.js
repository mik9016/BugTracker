import React, { useContext, useState } from "react";
import classes from "../Profile/Profile.module.scss";
import {
  Container,
  Form,
  Card,
  FormControl,
  FormLabel,
  Image,
} from "react-bootstrap";
import Pic from "../../assets/pic.jpg";

import { AuthContext } from "../../contexts/AuthContext";

export default function Profile() {
  const [isAuthorized, Login, LogOut, Register, userId,userName] = useContext(
    AuthContext
  );


  

  return (
    <div className={classes.Profile}>
      <Container>
        <Card>
          <Card.Title as="h1">Profile</Card.Title>
          <Card.Body>
            <Form>
              <Form.Group>
                <Image src={Pic} roundedCircle className={classes.Pic} />
                <Form.File id="exampleFormControlFile1" label="Avatar" />
              </Form.Group>
              <Form.Group>
                <FormLabel>Name</FormLabel>
                <FormControl type="text" />
              </Form.Group>
              <Form.Group>
                <FormLabel>Email</FormLabel>
                <FormControl type="email" />
              </Form.Group>
              <Form.Group>
                <FormLabel>Role</FormLabel>
                <Form.Control as="select">
                  <option>Manager</option>
                  <option>Developer</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
