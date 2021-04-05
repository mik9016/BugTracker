import React, { useContext, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import classes from "./ManageTeam.module.scss";
import SetTeamsUserRole from "../../components/SetTeamUserRole/SetTeamUserRole";
import {Link,useHistory} from 'react-router-dom';

export default function ManageTeam() {
    const history = useHistory()
  return (
    <div className={classes.ManageTeam}>
      <h1>Manage Team</h1>
      <Button
          variant="outline-success"
          className="m-2  w-25"
          onClick={(e) => {
            e.preventDefault();
            history.push("/dashboard");
          }}
        >
         back to dashboard
        </Button>
      <Button 
          variant="outline-success"
          className="m-2  w-25"
          onClick={(e) => {
            e.preventDefault();
            history.push("/addmember");
          }}>Add Member</Button>
      <Container>
        <SetTeamsUserRole />
      </Container>
    </div>
  );
}
