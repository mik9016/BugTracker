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
  Alert,
} from "react-bootstrap";
import { DbContext } from "../../contexts/DbContext";
import { UtilContext } from "../../contexts/UtilitiesContext";
import { useHistory } from "react-router";
import useGetTeamData from "../../Hooks/useGetTeamData";
import useGetUsers from "../../Hooks/useGetUsers";
import useGetLoggedUser from "../../Hooks/useGetLoggedUser";
import back from "../../assets/back.svg";
import bug from "../../assets/bug.png";

export default function Createissue() {
  const dbContextContent = useContext(DbContext);
  const metaObj = useContext(UtilContext);
  const history = useHistory();

  const issueName = useRef("");
  const issueDesc = useRef("");
  const issueCreator = useRef("");
  const issueWorker = useRef("");

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [creator, setCreator] = useState("");
  const [worker, setWorker] = useState("");
  const [err, setErr] = useState("");

  const teamMembers = useGetTeamData();
  const Users = useGetUsers();
  const loggedUser = useGetLoggedUser();

  return (
    <div className={classes.CreateIssue}>
      <Container>
        <Row>
          <img
            src={back}
            className={classes.BackIcon}
            onClick={() => history.push("/dashboard")}
          />
        </Row>
        <Container>
          <img src={bug} className={classes.BugIcon} />
          <h2>Create Issue</h2>
        </Container>
        <Container className={classes.CardContainer}>
          <Card className={classes.Card}>
            {err && (
              <Alert className="m-2" variant="danger">
                {err}
              </Alert>
            )}
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
                    {Users.map((user, index) => {
                      if (user.userEmail === loggedUser.email) {
                        return <option key={index}>{user.userName}</option>;
                      }
                    })}
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
                    {teamMembers.map((member, index) => {
                      if (member.project === dbContextContent.currentProject) {
                        return (
                          <option key={index}>{member.memberEmail}</option>
                        );
                      }
                    })}
                  </Form.Control>
                </Form.Group>
                <Button
                  className="mt-2 w-50"
                  type="submit"
                  variant="outline-success"
                  onClick={(e) => {
                    e.preventDefault();
                    if (
                      metaObj.validateField(name, 0) &&
                      metaObj.validateField(desc, 0) &&
                      metaObj.validateField(creator, 0) &&
                      metaObj.validateField(worker, 0)
                    ) {
                      setErr("");
                      dbContextContent.CreateNewIssue(
                        name,
                        desc,
                        creator,
                        worker
                      );
                      console.log(name, desc, creator, worker);
                      metaObj.clearInput(issueName);
                      metaObj.clearInput(issueDesc);
                      metaObj.clearInput(issueCreator);
                      metaObj.clearInput(issueWorker);
                      history.push("/dashboard");
                    } else {
                      setErr("Fields can not be empty");
                    }
                  }}
                >
                  Create
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </Container>
    </div>
  );
}
