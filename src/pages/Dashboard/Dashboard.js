import React from "react";
import NavigationBar from "../../components/Navigation-Bar";
import { BrowserRouter as Router, Link } from "react-router-dom";
import StatCard from "../../components/StatCard/StatCard";
import classes from "../Dashboard/Dashboard.module.scss";
import { Container, Row, Button } from "react-bootstrap";
import IssueTable from "../../components/IssueTable/IssueTable";
import DashboardNav from "../../components/DashboardNav/DashboardNav";

export default function Dashboard() {
  const hardcodedData = {
    title: "open:",
    text: "54",
  };
  return (
    <div className={classes.Dashboard}>
      <Router>
        {/* <NavigationBar /> */}
        <Button href='/createIssue'  variant='outline-success' className='m-2 d-flex justify-content-start w-25'>Create Issue</Button>
        <Container>
          <Container className={classes.StatCard}>
            <Row className="offset-0">
              <StatCard
                styleType={classes.StyleTypeOpen}
                title={hardcodedData.title}
                text={hardcodedData.text}
              />
              <StatCard
                styleType={classes.StyleTypeClosed}
                title={hardcodedData.title}
                text={hardcodedData.text}
              />
              <StatCard
                styleType={classes.StyleTypeToDo}
                title={hardcodedData.title}
                text={hardcodedData.text}
              />
            </Row>
          </Container>
          <IssueTable />
        </Container>
      </Router>
    </div>
  );
}
