import React, { useContext, useState, useRef } from "react";
import {
  Container,
  Button,
  Card,
  Form,
  FormControl,
  Row,
  FormGroup,
  Col,
  Alert,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { TeamContext } from "../../contexts/TeamContext";
import { DbContext } from "../../contexts/DbContext";
import useGetUsers from "../../Hooks/useGetUsers";
import { UtilContext } from "../../contexts/UtilitiesContext";
import classes from "./AddMember.module.scss";
import back from "../../assets/back.svg";
import user from "../../assets/user.svg";

export default function AddMember() {
  const history = useHistory();
  const [setTeamData, getTeamData] = useContext(TeamContext);
  const [clearInput, checkLog, setDateStamp, setTimeStamp] = useContext(
    UtilContext
  );
  const [newMember, setNewMember] = useState("");
  const mailRef = useRef();
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
  const users = useGetUsers();
  const [err, setError] = useState("");

  return (
    <div>
      <Container>
        <Row>
          <img
            className={classes.BackIcon}
            src={back}
            onClick={(e) => {
              e.preventDefault();
              history.push("/manageteam");
            }}
          />
        </Row>
        <Container>
          <img src={user} className={classes.UserIcon} />
          <h2>Add Member</h2>
        </Container>

        <Container className={classes.CardContainer}>
          <Card className={classes.Card}>
            <Card.Title className="mt-4">Manage team Member</Card.Title>
            <Card.Body className={classes.CardBody}>
              <p>
                To add new member, add his/her email adress. <br />
                Note that he/she needs to be registered to be part of the team
              </p>
            </Card.Body>

            <Row className="m-4 ">
              {err}
              <FormControl
                className="w-50 m-2"
                type="email"
                placeholder="email of new member"
                ref={mailRef}
                onChange={(e) => setNewMember(e.target.value)}
              />

              <Button
                className="m-2"
                variant="outline-success"
                onClick={() => {
                  if (mailRef.current.value.length > 3) {
                    users.map((user) => {
                      if (user.userEmail === newMember) {
                        setTeamData(
                          currentProject,
                          "memberUid",
                          newMember,
                          "Developer",
                          "memberName"
                        );
                      }
                    });
                    alert("User added!");
                    clearInput(mailRef);
                  } else {
                    return setError(
                      <Alert variant="danger">email adress to short</Alert>
                    );
                  }
                }}
              >
                Add
              </Button>
            </Row>
          </Card>
        </Container>
      </Container>
    </div>
  );
}
