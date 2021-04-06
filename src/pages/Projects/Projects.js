import React, { useContext, useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { DbContext } from "../../contexts/DbContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import classes from "./Projects.module.scss";
import { fire } from "../../Firebase";
import useGetLoggedUser from "../../Hooks/useGetLoggedUser";
import useGetTeamData from "../../Hooks/useGetTeamData";

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

  const [
    isAuthorized,
    Login,
    LogOut,
    Register,
    userId,
    setUserId,
    userName,
    userEmail,
  ] = useContext(AuthContext);

  const history = useHistory();
  const teamData = useGetTeamData();

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects(setProjects);

    return () => {
      getProjects(setProjects);
    };
  }, []);

  // console.log(teamData);

  function filterProjectsUserIsInvolvedIn() {
    let projects = [];
    teamData.map((member) => {
      if (member.memberEmail === userEmail) {
        projects.push(member.project);
      }
    });
  

    return projects;
  }



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
        <h4>Your Projects:</h4>
        {projects.map((project, index) => {
          if (project.user === userId) {
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
          } else {
            <h2>No projects created yet</h2>;
          }
        })}
        <h4>Projects you are part of:</h4>
        {/* check Projects in Db */}
        {projects.map((project, index) => {
          // filter out projects users was added to the team 
          return filterProjectsUserIsInvolvedIn().map(
            (projectUserIsInvolvedIn) => {
              //check list of projects which match to the projects user was involved in and created
              if (projectUserIsInvolvedIn === project.projectName) {
                //check if user has created them if not return those projects
                if(project.creatorEmail !== userEmail){
                  return (
                    <Card key={index} className={classes.Card}>
                      <Card.Title
                        onClick={() => {
                          setPickedProjectId(project.id);
                          setCurrentProject(project.projectName);
                          history.push("/dashboard");
                        }}
                      >
                        {projectUserIsInvolvedIn}
                      </Card.Title>
                    </Card>
                  );
                }

              }
            }
          );
        })}
      </Container>
    </div>
  );
}
