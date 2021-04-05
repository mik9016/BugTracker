import React, { useState, useContext } from "react";
import { Container, Card, Form, Button, FormControl } from "react-bootstrap";
import classes from "./SetTeamUserRole.module.scss";
import useGetTeamData from "../../Hooks/useGetTeamData";
import { DbContext } from "../../contexts/DbContext";

export default function SetTeamUserRole() {
  const [showMembers, setShowMembers] = useState(false);

  const teamMembers = useGetTeamData();

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
  ] = useContext(DbContext);
  console.log(teamMembers);

  return (
    <div className={classes.SetTeamUserRole}>
      <Container>
        <Card>
          <Card.Title
            className={classes.Title}
            onClick={() => {
              !showMembers ? setShowMembers(true) : setShowMembers(false);
            }}
          >
            Team Members:
          </Card.Title>
          <Card.Body>
            {teamMembers.map((member, index) => {
              if (member.project === currentProject)
                return (
                  <p key={index}>
                    {" "}
                    {member.memberEmail} - {member.memberRole}
                  </p>
                );
            })}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
