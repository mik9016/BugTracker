import React, { useContext, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import classes from "./ManageTeam.module.scss";
import SetTeamsUserRole from "../../components/SetTeamUserRole/SetTeamUserRole";
import { Link, useHistory } from "react-router-dom";
import back from "../../assets/back.svg";
import add from "../../assets/add.svg";

export default function ManageTeam() {
  const history = useHistory();
  return (
    <div className={classes.ManageTeam}>
      <Container>
        <Row>
          <img
            className={classes.BackIcon}
            src={back}
            onClick={(e) => {
              e.preventDefault();
              history.push("/dashboard");
            }}
          />
        </Row>

        <img
          className={classes.BackIcon}
          src={add}
          onClick={(e) => {
            e.preventDefault();
            history.push("/addmember");
          }}
        />

        <h2>Manage Members</h2>
        to add Member click on icon above
        <Container className={classes.Card}>
          <SetTeamsUserRole />
        </Container>
      </Container>
    </div>
  );
}
