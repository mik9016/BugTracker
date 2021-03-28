import classes from "../CreateIssue/CreateIssue.module.scss";
import React, { useRef, useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { DbContext } from "../../contexts/DbContext";
import { UtilContext } from "../../contexts/UtilitiesContext";
import { useHistory } from "react-router";

export default function Createissue() {
  const [CreateNewProject, CreateNewIssue, currentProject] = useContext(
    DbContext
  );
  const [clearInput, checkLog] = useContext(UtilContext);
  const history = useHistory();
  const hardcodedUsers = {
    first: "MIk Gru",
    second: "Jeff beck",
    third: "Bob Patola",
  };

  const issueName = useRef("");
  const issueDesc = useRef("");
  const issueCreator = useRef("");
  const issueWorker = useRef("");

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [creator, setCreator] = useState("");
  const [worker, setWorker] = useState("");

  return (
    <div className={classes.CreateIssue}>
      <Container>
        <Card>
          <Card.Title as="h1">Create Issue</Card.Title>
          <Card.Body>
            <Form>
              <Form.Group>
                <Form.Label>Issue Name</Form.Label>
                <FormControl
                  type="text"
                  ref={issueName}
                  onChange={(e) => {
                    setName(issueName.current.value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Issue Description</Form.Label>
                <FormControl
                  as="textarea"
                  rows={3}
                  ref={issueDesc}
                  onChange={(e) => {
                    setDesc(issueDesc.current.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Creator</Form.Label>
                <Form.Control
                  as="select"
                  ref={issueCreator}
                  onChange={(e) => {
                    setCreator(e.currentTarget.value);
                  }}
                >
                  <option>Choose...</option>
                  <option>{hardcodedUsers.first}</option>
                  <option>{hardcodedUsers.second}</option>
                  <option>{hardcodedUsers.third}</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Currently working</Form.Label>
                <Form.Control
                  as="select"
                  ref={issueWorker}
                  onChange={(e) => {
                    setWorker(e.target.value);
                  }}
                >
                  <option>Choose...</option>
                  <option>{hardcodedUsers.first}</option>
                  <option>{hardcodedUsers.second}</option>
                  <option>{hardcodedUsers.third}</option>
                </Form.Control>
              </Form.Group>
              <Button
                type="submit"
                variant="success"
                onClick={(e) => {
                  e.preventDefault();
                  CreateNewIssue(name, desc, creator, worker);
                  console.log(name, desc, creator, worker);
                  clearInput(issueName);
                  clearInput(issueDesc);
                  clearInput(issueCreator);
                  clearInput(issueWorker);
                  history.push('/dashboard');
                }}
              >
                Create
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
