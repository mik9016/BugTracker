import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Card,
  Button,
  Form,
  FormControl,
  FormLabel,
  Row,
  Col,
} from "react-bootstrap";
import classes from "./IssueDetails.module.scss";
import { DbContext } from "../../contexts/DbContext";
import { useHistory } from "react-router-dom";
import useGetTeamData from "../../Hooks/useGetTeamData";
import back from "../../assets/back.svg";
import details from "../../assets/details.svg";

export default function IssueDetails(props) {
  const history = useHistory();
  const dbContextContent = useContext(DbContext);
  const teamMembers = useGetTeamData();

  return (
    <div>
      <Container>
        <Row>
          <img
            src={back}
            className={classes.BackIcon}
            onClick={() => history.push("/dashboard")}
          />
        </Row>
        <Container>
          <img src={details} className={classes.InfoIcon} />
          <h2>Issue Details</h2>
        </Container>

        <Container className={classes.CardContainer}>
          <Card className={classes.Card}>
            <Card.Title as="h3" className="m-2">
              {dbContextContent.pickedIssueTitle}
            </Card.Title>
            <Form>
              <Form.Group>
                <FormLabel>Title</FormLabel>
                <FormControl
                  type="text"
                  value={dbContextContent.pickedIssueTitle}
                  onChange={(e) => {
                    dbContextContent.setPickedIssueTitle(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <FormLabel>Description</FormLabel>
                <FormControl
                  as="textarea"
                  rows={3}
                  value={dbContextContent.pickedIssue}
                  onChange={(e) => {
                    dbContextContent.setPickedIssue(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className={classes.Dropdown}>
                <FormLabel>Status</FormLabel>
                <FormControl
                  as="select"
                  onChange={(e) => {
                    dbContextContent.setPickedIssueStatus(e.target.value);
                  }}
                >
                  <option>{dbContextContent.pickedIssueStatus}</option>
                  <option>open</option>
                  <option>done</option>
                </FormControl>
              </Form.Group>

              <Form.Group>
                <FormLabel>Currerntly working at</FormLabel>
                <FormControl
                  as="select"
                  onChange={(e) => {
                    dbContextContent.setPickedIssueWorker(e.target.value);
                  }}
                >
                  <option>choose..</option>
                  {teamMembers.map((member, index) => {
                    if (member.project === dbContextContent.currentProject) {
                      return <option key={index}>{member.memberEmail}</option>;
                    }
                  })}
                </FormControl>
                <Row className={classes.Btn}>
                  <Button
                    className={classes.Btn}
                    variant="outline-success"
                    onClick={() => {
                      dbContextContent.changeIssueStatus(
                        dbContextContent.pickedIssueId,
                        dbContextContent.pickedIssueStatus
                      );
                      dbContextContent.changeIssueDescription(
                        dbContextContent.pickedIssueId,
                        dbContextContent.pickedIssue
                      );
                      dbContextContent.changeIssueTitle(
                        dbContextContent.pickedIssueId,
                        dbContextContent.pickedIssueTitle
                      );
                      dbContextContent.changeIssueWorker(
                        dbContextContent.pickedIssueId,
                        dbContextContent.pickedIssueWorker
                      );
                      history.push("/dashboard");
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    className={classes.Btn}
                    variant="outline-danger"
                    onClick={() => {
                      dbContextContent.deleteIssue(
                        dbContextContent.pickedIssueId
                      );
                      history.push("/dashboard");
                    }}
                  >
                    Delete
                  </Button>
                </Row>
              </Form.Group>
            </Form>
          </Card>
        </Container>
      </Container>
    </div>
  );
}
