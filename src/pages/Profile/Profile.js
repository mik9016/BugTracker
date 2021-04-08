import React, { useContext, useState } from "react";
import classes from "../Profile/Profile.module.scss";
import {
  Container,
  Form,
  Card,
  FormControl,
  FormLabel,
  Image,
  Button,
  Col,
  Row,
} from "react-bootstrap";
import Pic from "../../assets/pic.jpg";
import user from "../../assets/user.svg";
import upload from "../../assets/upload.svg";

import { AuthContext } from "../../contexts/AuthContext";

export default function Profile() {
  const [isAuthorized, Login, LogOut, Register, userId, userName] = useContext(
    AuthContext
  );

  return (
    <div className={classes.Profile}>
      <Container>
        <img src={user} className={classes.BackIcon} />
        <h2>Profile</h2>
      </Container>
      <Container className={classes.CardContainer}>
        <Card className={classes.Card}>
          <Card.Body>
            <Form className={classes.Form}>
              <Form.Group>
                <Col>
                  <Image src={Pic} roundedCircle className={classes.Pic} />
                </Col>
                <Col>
                  <label>
                    <Row>
                      <img src={upload} className={classes.UploadIcon} />
                      <h5 className="mt-4">Upload File</h5>
                      <Form.File
                        id="Avatar"
                        label="Avatar"
                        className={classes.Upload}
                      />
                    </Row>
                  </label>
                </Col>
              </Form.Group>
              <Form.Group>
                <FormLabel>Name</FormLabel>
                <FormControl type="text" className={classes.Input} />
              </Form.Group>
              <Form.Group>
                <FormLabel>Email</FormLabel>
                <FormControl type="email" className={classes.Input} />
              </Form.Group>
              <Form.Group>
                <FormLabel>Role</FormLabel>
                <Form.Control as="select" className={classes.Input}>
                  <option>Manager</option>
                  <option>Developer</option>
                </Form.Control>
              </Form.Group>
              <Button className="mt-4 mb-2" variant="outline-success">
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
