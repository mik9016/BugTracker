import React, { useContext, useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { DbContext } from "../../contexts/DbContext";
import { useHistory } from "react-router-dom";
import classes from "./Projects.module.scss";

export default function Projects() {
  const [
    CreateNewProject,
    CreateNewIssue,
    currentProject,
    getProjects,
    getIssues,
    setCurrentProject,
  ] = useContext(DbContext);

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
          return (
            <Card key={index} className={classes.Card}>
              <Card.Title
                onClick={() => {
                  setCurrentProject(project.projectName);
                  history.push("/dashboard");
                }}
              >
                {project.projectName}
              </Card.Title>
            </Card>
          );
        })}
      </Container>
    </div>
  );
}
