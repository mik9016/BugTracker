import React from "react";
import classes from "../IssueTable/IssueTable.module.scss";
import { Card, Table, Container } from "react-bootstrap";


export default function IssueTable(props) {
  const hardcodedIssue = {
    date: "22.01.2021",
    title: "Fixing Issue scss responsiveness",
    status: "open",
    openSince: "22h",
    author: "Mik Gru",
    responsible: "Mikolaj",
  };
  const arr = [hardcodedIssue, hardcodedIssue, hardcodedIssue];

  return (
    <div className={classes.IssueTable}>
      <Container>
        <Card className="shadow">
          <Table responsive>
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Status</th>
                <th>Open since</th>
                <th>Author</th>
                <th>Responsible</th>
              </tr>
            </thead>
            <tbody>
              {arr.map((obj,index) => {
                return (
                  <tr className={classes.Issue} key={index}>
                    {Object.values(obj).map((item, index) => {
                      return <td key={index}><a href='#cps'>{item}</a></td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card>
      </Container>
    </div>
  );
}
