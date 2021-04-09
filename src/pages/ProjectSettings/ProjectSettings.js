import React, { useState, useContext, useEffect } from "react";
import classes from "./ProjectSettings.module.scss";
import {
  Container,
  Card,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { DbContext } from "../../contexts/DbContext";
import { useHistory } from "react-router-dom";
import back from "../../assets/back.svg";
import project from "../../assets/subtitle1.svg";

export default function ProjectSettings() {
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
    deleteIssue
  ] = useContext(DbContext);

  return (
    <div className={classes.ProjectSettings}>
      <Container>
        <Row>
          <img
            src={back}
            className={classes.BackIcon}
            onClick={() => {
              history.push("/dashboard");
            }}
          />
        </Row>
        <Container>
          <img src={project} className={classes.BackIcon} />
          <h2>ProjectSettings</h2>
        </Container>

        <Container className={classes.CardContainer}>
          <Card className={classes.Card}>
            <FormGroup className={classes.FormGr}>
              <Card.Title className="mt-4">Project Title</Card.Title>
              <FormControl
                className="mt-4 text-center w-75"
                type="text"
                value={pickedProject}
                onChange={(e) => {
                  setPickedProject(e.target.value);
                }}
              />
              <Row>
                <Button
                  className="mt-4 "
                  variant="outline-success"
                  onClick={() => {
                    changeProjectTitle(pickedProjectId, pickedProject);
                  }}
                >
                  Save
                </Button>
                <Button
                  className="mt-4 ml-4 "
                  variant="outline-danger"
                  onClick={() => {
                    deleteProjectTitle(pickedProjectId, pickedProject);
                    history.push('/projects');
                  }}
                >
                  Delete
                </Button>
              </Row>
            </FormGroup>
          </Card>
        </Container>
      </Container>
    </div>
  );
}
