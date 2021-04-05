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
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { TeamContext } from "../../contexts/TeamContext";
import { DbContext } from "../../contexts/DbContext";
import useGetUsers from "../../Hooks/useGetUsers";
import { UtilContext } from "../../contexts/UtilitiesContext";

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

  return (
    <div>
      <h1>Add Member</h1>
      <Button
        variant="outline-success"
        className="m-2  w-25"
        onClick={(e) => {
          e.preventDefault();
          history.push("/manageteam");
        }}
      >
        back
      </Button>
      <Container>
        <Card>
          <Card.Title>Manage team Member</Card.Title>
          <Card.Body>
            <p>
              To add new member, add his/her email adress. <br />
              Note that he/she needs to be registered to be part of the team
            </p>
          </Card.Body>
          <FormGroup>
            <Row className="m-4 ">
              <FormControl
                className="w-75 m-2"
                type="text"
                placeholder="email of new member"
                ref={mailRef}
                onChange={(e) => setNewMember(e.target.value)}
              />
              <Button
                className="m-2"
                variant="success"
                onClick={() => {
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
                }}
              >
                Add
              </Button>
              <Button className="m-2" variant="danger">
                Remove
              </Button>
            </Row>
          </FormGroup>
        </Card>
      </Container>
    </div>
  );
}
