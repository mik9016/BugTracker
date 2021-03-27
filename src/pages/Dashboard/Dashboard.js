import React, { useContext, useState, useEffect } from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import StatCard from "../../components/StatCard/StatCard";
import classes from "../Dashboard/Dashboard.module.scss";
import { Container, Row, Button } from "react-bootstrap";
import IssueTable from "../../components/IssueTable/IssueTable";
import DashboardNav from "../../components/DashboardNav/DashboardNav";
import { DbContext } from "../../contexts/DbContext";

export default function Dashboard() {
  const history = useHistory();
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
    }
  }, []);

  console.log(issues.length);
  //HARDCODED DATA
  const hardcodedData = {
    title: "open:",
    text: issues.length,
  };

  return (
    <div className={classes.Dashboard}>
      <Router>
        {/* <NavigationBar /> */}
        <Button
          as={Link}
          to="/createIssue"
          variant="outline-success"
          className="m-2  w-25"
          onClick={(e) => {
            e.preventDefault();
            history.push("/createIssue");
          }}
        >
          Create Issue
        </Button>
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
