import React, { useState, useContext, useEffect } from "react";
import classes from "../IssueTable/IssueTable.module.scss";
import { Card, Table, Container, Button } from "react-bootstrap";
import { DbContext } from "../../contexts/DbContext";
import { UtilContext } from "../../contexts/UtilitiesContext";
import { Link, BrowserRouter as Router } from "react-router-dom";

export default function IssueTable(props) {
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
    pickedIssueWorker,
    setPickedIssueWorker,
  ] = useContext(DbContext);
  const [
    clearInput,
    checkLog,
    setDateStamp,
    setTimeStamp,
    compareTimes,
  ] = useContext(UtilContext);

  const [issues, setIssues] = useState([]);

  useEffect(() => {
    getIssues(setIssues);
    return () => {
      getIssues(setIssues);
    };
  }, []);

  return (
    <div className={classes.IssueTable}>
      <Container>
        <Card className={classes.Card}>
          <Table responsive bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Title</th>
                <th>Status</th>

                <th>Author</th>
                <th>Responsible</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((obj, index) => {
                if (obj.project === currentProject) {
                  if (obj.status === props.status) {
                    return (
                      <tr
                        onClick={() => {
                          setPickedIssue(obj.issueDesc);
                          setPickedIssueTitle(obj.issueName);
                          setPickedIssueStatus(obj.status);
                          setPickedIssueId(obj.id);
                        }}
                        className={classes.Issue}
                        key={index}
                      >
                        <td>{obj.date}</td>
                        <td>{obj.time}</td>
                        <td
                          onClick={props.history}
                          className={classes.IssueName}
                        >
                          {obj.issueName}
                        </td>

                        <td>{obj.status}</td>

                        <td>{obj.creator}</td>
                        <td>{obj.currentlyWorking}</td>
                      </tr>
                    );
                  }
                }
                return;
              })}
            </tbody>
          </Table>
        </Card>
      </Container>
    </div>
  );
}
