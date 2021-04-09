import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Card,
  Button,
  Form,
  FormControl,
  FormLabel,
  Row,
  Col,
} from "react-bootstrap";
import classes from "./IssueDetails.module.scss";
import { DbContext } from "../../contexts/DbContext";
import { useHistory } from "react-router-dom";
import useGetTeamData from "../../Hooks/useGetTeamData";
import back from "../../assets/back.svg";
import details from "../../assets/details.svg";

export default function IssueDetails(props) {
  const history = useHistory();
  const [
    CreateNewProject,
    CreateNewIssue,
    currentProject,
    getProjects,
    getIssues,
    setCurrentProject,
    statusNumHandler,
    pickedIssue,
    setPickedIssue,
    pickedIssueTitle,
    setPickedIssueTitle,
    pickedIssueStatus,
    setPickedIssueStatus,
    pickedIssueId,
    setPickedIssueId,
    changeIssueDescription,
    changeIssueStatus,
    changeIssueTitle,
    changeProjectTitle,
    pickedProject,
    setPickedProject,
    pickedProjectId,
    setPickedProjectId,
    setUserInDB,
    getUsersListFromDB,
    updateUsersRole,
    updateUserProjects,
    pickedIssueWorker,
    setPickedIssueWorker,
    changeIssueWorker,
    deleteProjectTitle,
    deleteIssue,
  ] = useContext(DbContext);
  const teamMembers = useGetTeamData();

  return (
    <div>
      <Container>
        <Row>
          <img
            src={back}
            className={classes.BackIcon}
            onClick={() => history.push("/dashboard")}
          />
        </Row>
        <Container>
          <img src={details} className={classes.InfoIcon} />
          <h2>Issue Details</h2>
        </Container>

        <Container className={classes.CardContainer}>
          <Card className={classes.Card}>
            <Card.Title as="h3" className="m-2">
              {pickedIssueTitle}
            </Card.Title>
            <Form className={classes.Form}>
              <Form.Group>
                <FormLabel>Title</FormLabel>
                <FormControl
                  className={classes.Input}
                  type="text"
                  value={pickedIssueTitle}
                  onChange={(e) => {
                    setPickedIssueTitle(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <FormLabel>Description</FormLabel>
                <FormControl
                  className={classes.Input}
                  as="textarea"
                  rows={3}
                  value={pickedIssue}
                  onChange={(e) => {
                    setPickedIssue(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className={classes.Dropdown}>
                <FormLabel>Status</FormLabel>
                <FormControl
                  className={classes.Input}
                  as="select"
                  onChange={(e) => {
                    setPickedIssueStatus(e.target.value);
                  }}
                >
                  <option>{pickedIssueStatus}</option>
                  <option>open</option>
                  <option>done</option>
                </FormControl>
              </Form.Group>

              <Form.Group>
                <FormLabel>Currerntly working at</FormLabel>
                <FormControl
                  className={classes.Input}
                  as="select"
                  onChange={(e) => {
                    setPickedIssueWorker(e.target.value);
                  }}
                >
                  <option>choose..</option>
                  {teamMembers.map((member, index) => {
                    if (member.project === currentProject) {
                      return <option key={index}>{member.memberEmail}</option>;
                    }
                  })}
                </FormControl>
                <Row className={classes.Btn}>
                  <Button
                    className="mt-4 w-25"
                    variant="outline-success"
                    onClick={() => {
                      changeIssueStatus(pickedIssueId, pickedIssueStatus);
                      changeIssueDescription(pickedIssueId, pickedIssue);
                      changeIssueTitle(pickedIssueId, pickedIssueTitle);
                      changeIssueWorker(pickedIssueId, pickedIssueWorker);
                      history.push("/dashboard");
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    className="mt-4 ml-4 w-25"
                    variant="outline-danger"
                    onClick={() => {
                      deleteIssue(pickedIssueId);
                      history.push("/dashboard");
                    }}
                  >
                    Delete
                  </Button>
                </Row>
              </Form.Group>
            </Form>
          </Card>
        </Container>
      </Container>
    </div>
  );
}
