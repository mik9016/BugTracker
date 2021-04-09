import React, { useState, useContext, useRef, useEffect } from "react";
import { TeamContext } from "../../contexts/TeamContext";
import classes from "./MemberDetails.module.scss";
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
import { DbContext } from "../../contexts/DbContext";
import useGetUsers from "../../Hooks/useGetUsers";
import { UtilContext } from "../../contexts/UtilitiesContext";

import back from "../../assets/back.svg";
import user from "../../assets/userMinus.svg";

export default function MemberDetails() {
  const history = useHistory();
  const [
    setTeamData,
    getTeamData,
    deleteTeamMember,
    memberMail,
    setMemberMail,
    memberId,
    setMemberId,
  ] = useContext(TeamContext);

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

  const [err, setError] = useState("");
  const [member, setMember] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    setMember(memberMail);
    setId(memberId);
  }, []);

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
          <h2>Delete Member</h2>
        </Container>

        <Container className={classes.CardContainer}>
          <Card className={classes.Card}>
            <Card.Title className="mt-4">{member}</Card.Title>
            <div>
              <Button
                className="w-50 mt-4"
                variant="outline-danger"
                onClick={() => {
                    deleteTeamMember(id)
                 console.log(id);
                  history.push("/manageteam");
                }}
              >
                Delete
              </Button>
            </div>
          </Card>
        </Container>
      </Container>
    </div>
  );
}
