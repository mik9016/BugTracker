import React, { useState, useEffect, useContext } from "react";
import { Container, Card, Button } from "react-bootstrap";
import classes from "./IssueDetails.module.scss";
import { DbContext } from "../../contexts/DbContext";

export default function IssueDetails() {
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
  ] = useContext(DbContext);
  

  return (
    <div className={classes.IssueDetails}>
      <Container>
        <Card>
            <h1>IssueDetails</h1>
          <Card.Title> IssueDetails</Card.Title>
        </Card>
      </Container>
    </div>
  );
}
