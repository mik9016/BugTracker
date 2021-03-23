import classes from "../CreateIssue/CreateIssue.module.scss";
import React, { useRef, useState, useContext } from "react";
import { Container, Row, Col, Card, Form, FormControl, Button } from "react-bootstrap";

export default function Createissue() {
  const hardcodedUsers = {
    first: "MIk Gru",
    second: "Jeff beck",
    third: "Bob Patola",
  };
  return (
    <div className={classes.CreateIssue}>
      <Container>
        <Card>
          <Card.Title as="h1">Create Issue</Card.Title>
          <Card.Body>
            <Form>
              <Form.Group>
                <Form.Label>Issue Name</Form.Label>
                <FormControl type="text" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Issue Description</Form.Label>
                <FormControl as="textarea" rows={3}/>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Creator</Form.Label>
                <Form.Control as="select" defaultValue="Choose...">
                  <option>{hardcodedUsers.first}</option>
                  <option>{hardcodedUsers.second}</option>
                  <option>{hardcodedUsers.third}</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Currently working</Form.Label>
                <Form.Control as="select" defaultValue="Choose...">
                  <option>{hardcodedUsers.first}</option>
                  <option>{hardcodedUsers.second}</option>
                  <option>{hardcodedUsers.third}</option>
                </Form.Control>
              </Form.Group>
              <Button type='submit' variant='success' >Create</Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
