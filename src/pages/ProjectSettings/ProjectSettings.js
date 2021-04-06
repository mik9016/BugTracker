import React, { useState, useContext, useEffect } from "react";
import classes from "./ProjectSettings.module.scss";
import {
  Container,
  Card,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button
} from "react-bootstrap";
import { DbContext } from "../../contexts/DbContext";
import {useHistory} from 'react-router-dom'

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
  ] = useContext(DbContext);

  return (
    <div className={classes.ProjectSettings}>
      <h1>ProjectSettings</h1>
      <Container>
        <Button className='m-2' variant='outline-success' onClick={()=>{history.push('/dashboard')}}>Back</Button>
        <Card>
          <FormGroup>
            <FormLabel>Project Title</FormLabel>
            <FormControl
              type="text"
              value={pickedProject}
              onChange={(e) => {
                setPickedProject(e.target.value);
              }}
            />
            <Button
              onClick={() => {
                changeProjectTitle(pickedProjectId,pickedProject);
              }}
            >
              Save
            </Button>
          </FormGroup>
        </Card>
      </Container>
    </div>
  );
}
