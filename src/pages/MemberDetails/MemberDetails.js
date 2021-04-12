import React, { useState, useContext, useRef, useEffect } from "react";
import { TeamContext } from "../../contexts/TeamContext";
import classes from "./MemberDetails.module.scss";
import { Container, Button, Card, Row, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import back from "../../assets/back.svg";
import user from "../../assets/ninja.svg";

export default function MemberDetails() {
  const history = useHistory();
  const teamContextContent = useContext(TeamContext);

  const [err, setError] = useState("");
  const [member, setMember] = useState("");
  const [id, setId] = useState("");

  const role = useRef();

  const [changedRole, setChangedRole] = useState("");

  useEffect(() => {
    setMember(teamContextContent.memberMail);
   setId(teamContextContent.memberId);
  }, []);

  function roleCheck(role) {
    const dev = "Developer";
    const manager = "Manager";
    if (role === dev) {
      return <option>{manager}</option>;
    } else {
      return <option>{dev}</option>;
    }
  }

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
          <h2>Change Role</h2>
          Note that only managers can edit roles of members of the team.
        </Container>

        <Container className={classes.CardContainer}>
          <Card className={classes.Card}>
            <Card.Title className="mt-4">{member}</Card.Title>
            <div>
              <Form.Control
                disabled={!teamContextContent.loggedUserisManager}
                as="select"
                ref={role}
                onChange={(e) => {
                  setChangedRole(role.current.value);
                }}
              >
                <option>Choose...</option>
                {roleCheck(teamContextContent.membersRole)}
              </Form.Control>
              <Button
                className="w-50 mt-4"
                disabled={!teamContextContent.loggedUserisManager}
                variant="outline-success"
                onClick={() => {
                  teamContextContent.updateTeamMembersRole(teamContextContent.memberId, changedRole);
                  history.push("/manageteam");
                }}
              >
                Save
              </Button>
            </div>
          </Card>
        </Container>
      </Container>
    </div>
  );
}
