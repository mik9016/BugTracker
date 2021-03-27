import React, { useState, useContext, useEffect } from "react";
import classes from "../IssueTable/IssueTable.module.scss";
import { Card, Table, Container } from "react-bootstrap";
import { DbContext } from "../../contexts/DbContext";

export default function IssueTable(props) {
  const [
    CreateNewProject,
    CreateNewIssue,
    currentProject,
    getProjects,
    getIssues,
  ] = useContext(DbContext);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    getIssues(setIssues);
    return () => {
      getIssues(setIssues);
      
    };
  }, []);

  console.log(issues)

  //HARDCODED ISSUE
  const hardcodedIssue = {
    num: "#" + Math.random() * 10,
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
                <th>Issue number</th>
                <th>Date</th>
                <th>Title</th>
                <th>Status</th>
                <th>Open since</th>
                <th>Author</th>
                <th>Responsible</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((obj, index) => {
                return (
                  <tr className={classes.Issue} key={index}>
                    {/* {Object.values(obj).map((item, index) => {
                      return (
                        <td key={index}>
                          <a href="#cps">{item}</a>
                        </td>
                      );
                    })} */}
                    <td>{index+1}</td>
                    <td>{obj.id}</td>
                    <td>{obj.issueName}</td>
                    <td>open</td>
                    <td>{}</td>
                    <td>{obj.creator}</td>
                    <td>{obj.currentlyWorking}</td>
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
