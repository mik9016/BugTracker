import React, { useContext, useState, useEffect } from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import StatCard from "../../components/StatCard/StatCard";
import classes from "../Dashboard/Dashboard.module.scss";
import { Container, Row, Button, Form } from "react-bootstrap";
import IssueTable from "../../components/IssueTable/IssueTable";
import DashboardNav from "../../components/DashboardNav/DashboardNav";
import { DbContext } from "../../contexts/DbContext";
import SortDropdown from "../../components/SortDropdown/SortDropdown";

export default function Dashboard() {
  const history = useHistory();
  const pushHistory = () => {
    history.push("/details");
  };

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

  const [ticketValue, setTicketValue] = useState("pending");
  const [issues, setIssues] = useState([]);
  const [projects, setProjects] = useState([]);
  const [pendingNum, setPendingNum] = useState(0);
  const [openNum, setOpenNum] = useState(0);
  const [doneNum, setDoneNum] = useState(0);

  function filterProjectIssues(arr) {
    let filteredIssues = [];
    arr.map((issue) => {
      if (issue.project === currentProject) {
        filteredIssues.push(issue);
      }
    });
    return filteredIssues;
  }

  useEffect(() => {
    getIssues(setIssues);
    return () => {
      getIssues(setIssues);
    };
  }, []);

  useEffect(() => {
    statusNumHandler(filterProjectIssues(issues), setPendingNum, "pending");
    statusNumHandler(filterProjectIssues(issues), setOpenNum, "open");
    statusNumHandler(filterProjectIssues(issues), setDoneNum, "done");
    return () => {
      statusNumHandler(filterProjectIssues(issues), setPendingNum, "pending");
      statusNumHandler(filterProjectIssues(issues), setOpenNum, "open");
      statusNumHandler(filterProjectIssues(issues), setDoneNum, "done");
    };
  }, [issues]);

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
            history.push("/projects");
          }}
        >
          back to projects
        </Button>

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

        <Button
          className={classes.Btn}
          variant="outline-success"
          onClick={() => {
            history.push("/manageteam");
          }}
        >
          Team
        </Button>
        <h2
          className={classes.ProjectTitle}
          onClick={() => {
            setPickedProject(currentProject);
            history.push("/projectSettings");
          }}
        >
          {currentProject}
        </h2>
        <Container>
          <Form.Group>
            <Form.Control
              className={classes.SortDropdown}
              as="select"
              onChange={(e) => {
                setTicketValue(e.target.value);
              }}
            >
              <option>pending</option>
              <option>open</option>
              <option>done</option>
            </Form.Control>
          </Form.Group>
        </Container>
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
          <IssueTable history={() => pushHistory()} status={ticketValue} />
        </Container>
      </Router>
    </div>
  );
}
