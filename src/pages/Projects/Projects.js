import React, { useContext, useState, useEffect } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { DbContext } from "../../contexts/DbContext";
import { AuthContext } from "../../contexts/AuthContext";
import { TeamContext } from "../../contexts/TeamContext";
import { StyleContext } from "../../contexts/StyleContext";
import { useHistory } from "react-router-dom";
import classes from "./Projects.module.scss";

import useGetLoggedUser from "../../Hooks/useGetLoggedUser";
import useGetTeamData from "../../Hooks/useGetTeamData";
import subtitle1 from "../../assets/subtitle1.svg";
import subtitle2 from "../../assets/subtitle2.svg";
import plus from "../../assets/plus.svg";
import arrow from "../../assets/arrow.svg";

export default function Projects() {
  const dbContextContent = useContext(DbContext);
  const teamContextContent = useContext(TeamContext);
  const styleContextContent = useContext(StyleContext);

  const [
    isAuthorized,
    Login,
    LogOut,
    Register,
    userId,
    setUserId,
    userName,
    userEmail,
    setErr,
    err,
    validateEmail,
    validate,
    loading,
    setLoading,
  ] = useContext(AuthContext);

  const history = useHistory();
  const teamData = useGetTeamData();

  const [projects, setProjects] = useState([]);
  const [projectssad, setProjectssad] = useState(0);

  let projectNumber = [];

  useEffect(() => {
    dbContextContent.getProjects(setProjects);

    return () => {
      dbContextContent.getProjects(setProjects);
    };
  }, []);

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
      <Container>
        <Container>
          <img
            src={plus}
            className={classes.PlusSign}
            onClick={() => {
              history.push("/createProject");
            }}
          />

          <h3
            className={classes.CreateProjectTitle}
            onClick={() => {
              history.push("/createProject");
            }}
          >
            Create New Project
          </h3>
        </Container>

        <hr />
        <Row>
          <Col>
            <div className={classes.Subtitle}>
              <img src={subtitle1} />
              <h4>Your Projects:</h4>
            </div>
            
            

            {projects.map((project, index) => {
              if (project.user === userId) {
                projectNumber.push(project);
               return projectNumber.length === 0 ? (             
                  <h2>
                    No project created yet. <br/>
                    To Create project click create project or plus sign.
                  </h2>
                ):
                 (
                  <Card
                    key={index}
                    className={classes.Card}
                    onClick={() => {
                      dbContextContent.setPickedProjectId(project.id);
                      dbContextContent.setCurrentProject(project.projectName);
                      dbContextContent.setUsersRoleInPickedProject();
                      teamContextContent.checkIfManager(
                        userEmail,
                        project.creatorEmail,
                        project.projectRole,
                        teamContextContent.setLoggedUserisManager
                      );

                      history.push("/dashboard");
                    }}
                  >
                    <div className={classes.ProjectName}>
                      <Col className={classes.ProjectTextAlignment}>
                        <img src={arrow} alt="arrow" />
                      </Col>
                      <Col className={classes.ProjectTextAlignmentSub1}>
                        <Card.Title className={classes.ProjectText}>
                          {project.projectName}
                        </Card.Title>
                      </Col>
                    </div>
                  </Card>
                );
              }
            })}
          </Col>
          <Col>
            <div className={classes.Subtitle}>
              <img src={subtitle2} alt="subtitle Icon" />
              <h4>Projects you are part of:</h4>
            </div>

            <h2 style={styleContextContent.beInvolvedInProjectMessage}>
              No projects your are involved in. <br /> To be involved in a
              project you need to be added first.
            </h2>
            {/* check Projects in Db */}

            {projects.map((project, index) => {
              // filter out projects users was added to the team
              return filterProjectsUserIsInvolvedIn().map(
                (projectUserIsInvolvedIn) => {
                  //check list of projects which match to the projects user was involved in and created

                  if (
                    projectUserIsInvolvedIn === project.projectName &&
                    project.creatorEmail !== userEmail
                  ) {
                    //check if user has created them if not return those projects
                    // if (project.creatorEmail !== authContextContent.userEmail) {
                    return (
                      <Card key={index} className={classes.Card}>
                        <div className={classes.ProjectName}>
                          <Col className={classes.ProjectTextAlignment}>
                            <img src={arrow} alt="arrow" />
                          </Col>

                          <Col
                            className={classes.ProjectYourPartOfTextAlignment}
                          >
                            <Card.Title
                              className={classes.ProjectText}
                              onClick={() => {
                                dbContextContent.setPickedProjectId(project.id);
                                dbContextContent.setCurrentProject(
                                  project.projectName
                                );
                                teamContextContent.checkIfManager(
                                  userEmail,
                                  project.creatorEmail,
                                  project.projectRole,
                                  teamContextContent.setLoggedUserisManager
                                );
                                history.push("/dashboard");
                              }}
                            >
                              {projectUserIsInvolvedIn}
                            </Card.Title>
                          </Col>
                        </div>
                      </Card>
                    );
                    // }
                  }
                }
              );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
