import React, { useState, useContext, useEffect } from "react";
import classes from "../IssueTable/IssueTable.module.scss";
import { Card, Table, Container, Button } from "react-bootstrap";
import { DbContext } from "../../contexts/DbContext";

export default function IssueTable(props) {
  const dbContextContent = useContext(DbContext);

  const [issues, setIssues] = useState([]);

  useEffect(() => {
    dbContextContent.getIssues(setIssues);
    return () => {
      dbContextContent.getIssues(setIssues);
    };
  }, []);
  // ARRAY OF FILTERED ISSUE NAME FROM SEARCHFILED IN DASHBOARD COMPONENT
  const filteredProps = props.filter;
  // console.log(filteredProps)

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
              {/* FILTER BY STATUS */}
              {issues.map((obj, index) => {
                if (
                  obj.project === dbContextContent.currentProject &&
                  obj.status === props.status &&
                  props.filteredByLetter.length < 1 &&
                  props.searchFieldIsEmpty === true
                ) {
                  return (
                    <tr
                      onClick={() => {
                        dbContextContent.setPickedIssue(obj.issueDesc);
                        dbContextContent.setPickedIssueTitle(obj.issueName);
                        dbContextContent.setPickedIssueStatus(obj.status);
                        dbContextContent.setPickedIssueId(obj.id);
                      }}
                      className={classes.Issue}
                      key={index}
                    >
                      <td>{obj.date}</td>
                      <td>{obj.time}</td>
                      <td onClick={props.history} className={classes.IssueName}>
                        {obj.issueName}
                      </td>

                      <td>{obj.status}</td>

                      <td>{obj.creator}</td>
                      <td>{obj.currentlyWorking}</td>
                    </tr>
                  );
                }
              })}
              {/* FILTER BY WORD */}
              {props.filteredByLetter.map((filteredIssue, index) => {
                if (
                  props.filteredByLetter.length > 0 &&
                  props.searchFieldIsEmpty === false
                ) {
                  return (
                    <tr
                      onClick={() => {
                        dbContextContent.setPickedIssue(
                          filteredIssue.issueDesc
                        );
                        dbContextContent.setPickedIssueTitle(
                          filteredIssue.issueName
                        );
                        dbContextContent.setPickedIssueStatus(
                          filteredIssue.status
                        );
                        dbContextContent.setPickedIssueId(filteredIssue.id);
                      }}
                      className={classes.Issue}
                      key={index}
                    >
                      <td>{filteredIssue.date}</td>
                      <td>{filteredIssue.time}</td>
                      <td onClick={props.history} className={classes.IssueName}>
                        {filteredIssue.issueName}
                      </td>

                      <td>{filteredIssue.status}</td>

                      <td>{filteredIssue.creator}</td>
                      <td>{filteredIssue.currentlyWorking}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </Table>
        </Card>
      </Container>
    </div>
  );
}
