import React, { useState, useContext, useEffect } from "react";
import classes from "./ProjectSettings.module.scss";
import {
  Container,
  Card,
  FormGroup,
  FormControl,
  Button,
  Row,

} from "react-bootstrap";
import { DbContext } from "../../contexts/DbContext";
import { TeamContext } from "../../contexts/TeamContext";
import { StyleContext } from "../../contexts/StyleContext";
import { useGetIssues } from "../../Hooks/useGetIssues";
import { useHistory } from "react-router-dom";
import back from "../../assets/back.svg";
import project from "../../assets/subtitle1.svg";

export default function ProjectSettings() {
  const history = useHistory();
  const dbContextContent = useContext(DbContext);
  const teamContextContent = useContext(TeamContext);
  const styleContextContent = useContext(StyleContext);

  const issuesFromHook = useGetIssues();

  function updateProjectNameInAllIssues() {
    issuesFromHook.map((issue) => {
      if (issue.project === dbContextContent.currentProject)
        dbContextContent.changeIssueProjectName(
          issue.id,
          dbContextContent.pickedProject
        );
    });
  }

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
                disabled={!teamContextContent.loggedUserisManager}
                value={dbContextContent.pickedProject}
                onChange={(e) => {
                  dbContextContent.setPickedProject(e.target.value);
                }}
              />
              <Row>
                <Button
                  className="mt-4 "
                  variant="outline-success"
                  disabled={!teamContextContent.loggedUserisManager}
                  onClick={() => {
                    dbContextContent.changeProjectTitle(
                      dbContextContent.pickedProjectId,
                      dbContextContent.pickedProject
                    );
                    updateProjectNameInAllIssues();
                    alert("Project name changed");
                    history.push("/projects");
                  }}
                >
                  Save
                </Button>
                <Button
                  className="mt-4 ml-4 "
                  disabled={!teamContextContent.loggedUserisManager}
                  variant="outline-danger"
                  onClick={() => {
                    dbContextContent.deleteProjectTitle(
                      dbContextContent.pickedProjectId,
                      dbContextContent.pickedProject
                    );
                    styleContextContent.setCreateProjectMessage({ display: "block" });
                    history.push("/projects");
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
