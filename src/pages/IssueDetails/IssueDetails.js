import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Card,
  Button,
  Form,
  FormControl,
  FormLabel,
} from "react-bootstrap";
import classes from "./IssueDetails.module.scss";
import { DbContext } from "../../contexts/DbContext";
import { useHistory } from "react-router-dom";
import useGetTeamData from "../../Hooks/useGetTeamData";

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
  ] = useContext(DbContext);
  const teamMembers = useGetTeamData();

  return (
    <div className={classes.IssueDetails}>
      <Container>
        <Button
          variant="outline-primary"
          onClick={() => history.push("/dashboard")}
        >
          Back to dashboard
        </Button>
        <h1>Issue Details</h1>
        <Card>
          <Card.Title className="m-2">{pickedIssueTitle}</Card.Title>
          <Form.Group className={classes.Text}>
            <FormLabel>Title</FormLabel>
            <FormControl
              type="text"
              value={pickedIssueTitle}
              onChange={(e) => {
                setPickedIssueTitle(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className={classes.TextArea}>
            <FormLabel>Description</FormLabel>
            <FormControl
              as="textarea"
              value={pickedIssue}
              onChange={(e) => {
                setPickedIssue(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className={classes.Dropdown}>
            <FormLabel>Status</FormLabel>
            <FormControl
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
          </Form.Group>

          <Button
            onClick={() => {
              changeIssueStatus(pickedIssueId, pickedIssueStatus);
              changeIssueDescription(pickedIssueId, pickedIssue);
              changeIssueTitle(pickedIssueId, pickedIssueTitle);
              history.push("/dashboard");
            }}
          >
            Save
          </Button>
        </Card>
      </Container>
    </div>
  );
}
