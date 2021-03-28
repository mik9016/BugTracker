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
    setCurrentProject,
    statusNumHandler,
  ] = useContext(DbContext);

  const [issues, setIssues] = useState([]);
  const [projects, setProjects] = useState([]);
  const [pendingNum, setPendingNum] = useState(0);
  const [openNum, setOpenNum] = useState(0);
  const [doneNum, setDoneNum] = useState(0);

  useEffect(() => {
    getIssues(setIssues);
    return () => {
      getIssues(setIssues);
      
    };
  }, []);

  useEffect(() => {
    statusNumHandler(issues,setPendingNum,'pending');
    statusNumHandler(issues,setOpenNum,'open');
    statusNumHandler(issues,setDoneNum,'done');
    return () => {
      statusNumHandler(issues,setPendingNum,'pending');
      statusNumHandler(issues,setOpenNum,'open');
      statusNumHandler(issues,setDoneNum,'done');
    }
  }, [issues])

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
       
        <h2>{currentProject}</h2>
        <Container>
          <Container className={classes.StatCard}>
            <Row className="offset-0">
              <StatCard
                styleType={classes.StyleTypeOpen}
                title="Done"
                text={doneNum}
              />
              <StatCard
                styleType={classes.StyleTypeClosed}
                title="Open"
                text={openNum}
              />
              <StatCard
                styleType={classes.StyleTypeToDo}
                title="Pending"
                text={pendingNum}
              />
            </Row>
          </Container>
          <IssueTable history={()=>{history.push('/details')}}/>
        </Container>
      </Router>
    </div>
  );
}
