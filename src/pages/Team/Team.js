import React, { useState, useContext, useRef, useEffect } from "react";
import {
  Container,
  Card,
  FormControl,
  Row,
  Button,
  FormGroup,
  FormLabel,
  Form,
} from "react-bootstrap";

import { DbContext } from "../../contexts/DbContext";
import { UtilContext } from "../../contexts/UtilitiesContext";

export default function Team() {
  const mailRef = useRef();

  const [clearInput, checkLog, setDateStamp, setTimeStamp] = useContext(
    UtilContext
  );
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
  ] = useContext(DbContext);

  const [usersList, setUsersList] = useState([]);
  const [userMail, setUserMail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [filteredUsersList, setFilteredUsersList] = useState([]);
  const list = [];

  function filterUsersList(arr) {
    arr.map((user) => {
      if (user.userEmail === mailRef.current.value) {
        list.push({ user: user.userEmail, userName: user.userName });
      }
    });
    return list;
  }

  return (
    <div>
      <Container>
        <h1>Team</h1>
        <Card>
          <Card.Title className="m-2">Add or remove team members</Card.Title>
          <Card.Body>
            <p>
              To add new member, add his/her email adress. <br />
              Note that he/she needs to be registered to be part of the team
            </p>
            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormControl
                onChange={(e) => {
                  setUserMail(e.target.value);
                }}
                ref={mailRef}
                type="text"
                placeholder="email of new member"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>User</FormLabel>
              <FormControl as="select">
                {usersList.map((user, index) => {
                  return <option key={index}>{user.userName}</option>;
                })}
              </FormControl>
            </FormGroup>
            <Form.Group>
              <FormLabel>Role</FormLabel>
              <FormControl
                as="select"
                onChange={(e) => {
                  setUserRole(e.target.value);
                }}
              >
                <option>Manager</option>
                <option>Developer</option>
              </FormControl>
            </Form.Group>
            <Row className="m-2">
              <Button
                onClick={() => {
                  getUsersListFromDB(setUsersList);
                  filterUsersList(usersList);
                  filteredUsersList.push(list);
                  console.log(filteredUsersList);
                }}
                className="m-2"
                variant="success"
              >
                Add
              </Button>
              <Button className="m-2" variant="danger">
                Remove
              </Button>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
