import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Card,
  Button,
  Form,
  FormControl,
  FormLabel,
} from "react-bootstrap";
import classes from "./IssueDetails.module.scss";
import { DbContext } from "../../contexts/DbContext";

export default function IssueDetails(props) {
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
  ] = useContext(DbContext);

  return (
    <div className={classes.IssueDetails}>
      <Container>
        <h1>Issue Details</h1>

        <Card>
          <Card.Title className="m-2">{pickedIssueTitle}</Card.Title>
          <Form.Group className={classes.Text}>
            <FormLabel>Title</FormLabel>
            <FormControl
              type="text"
              value={pickedIssueTitle}
              onChange={(e) => {
                setPickedIssueTitle(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className={classes.TextArea}>
            <FormLabel>Description</FormLabel>
            <FormControl
              as="textarea"
              value={pickedIssue}
              onChange={(e) => {
                setPickedIssue(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className={classes.Dropdown}>
            <FormLabel>Status</FormLabel>
            <FormControl
              as="select"
              onChange={(e) => {
                setPickedIssueStatus(e.target.value);
              }}
            >
              <option>{pickedIssueStatus}</option>
              <option>open</option>
              <option>done</option>
            </FormControl>
          </Form.Group>
          <Button
            onClick={() => {
              changeIssueStatus(pickedIssueId, pickedIssueStatus);
              changeIssueDescription(pickedIssueId, pickedIssue);
              changeIssueTitle(pickedIssueId, pickedIssueTitle);
            }}
          >
            Save
          </Button>
        </Card>
      </Container>
    </div>
  );
}
