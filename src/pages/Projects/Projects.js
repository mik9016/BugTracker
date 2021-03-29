import React, { useContext, useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { DbContext } from "../../contexts/DbContext";
import { AuthContext} from '../../contexts/AuthContext';
import { useHistory } from "react-router-dom";
import classes from "./Projects.module.scss";
import {fire} from '../../Firebase';


export default function Projects() {
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

  const [isAuthorized, Login, LogOut, Register] = useContext(AuthContext);
 
  const history = useHistory();

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects(setProjects);

    return () => {
      getProjects(setProjects);
    };
  }, []);

  return (
    <div className={classes.Projects}>
      <h1>Projects:</h1>
      <Container>
        <Button
          className={classes.Btn}
          variant="outline-success"
          onClick={() => {
            history.push("/createProject");
          }}
        >
          Create Project
        </Button>
        {projects.map((project, index) => {
          if(project.user === fire.auth().currentUser.uid){
          return (
            <Card key={index} className={classes.Card}>
              <Card.Title
                onClick={() => {
                  setPickedProjectId(project.id);
                  setCurrentProject(project.projectName);
                  history.push("/dashboard");
                }}
              >
                {project.projectName}
              </Card.Title>
            </Card>
          );
        }else{
          <h2>No projects created yet</h2>
        }
        })}
      </Container>
    </div>
  );
}
