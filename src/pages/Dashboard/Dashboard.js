import React, { useContext, useState, useEffect } from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import StatCard from "../../components/StatCard/StatCard";
import classes from "../Dashboard/Dashboard.module.scss";
import {
  Container,
  Row,
  Button,
  Form,
  Col,
  FormControl,
} from "react-bootstrap";
import IssueTable from "../../components/IssueTable/IssueTable";
import DashboardNav from "../../components/DashboardNav/DashboardNav";
import { DbContext } from "../../contexts/DbContext";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import back from "../../assets/back.svg";
import plus from "../../assets/plus.svg";
import team from "../../assets/team.svg";
import bug from "../../assets/bug.png";

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

  // function filterIssuesByLetters(arr, string) {
  //   let filteredIssuesByLetter = [];
  //   if (string !== 0) {
  //     arr.map((issueName) => {
  //       if (issueName.issueName.toLowerCase().includes(string)) {
  //         filteredIssuesByLetter.push(issueName);
  //       }
  //     });
  //   };

  //   console.log(filteredIssuesByLetter);
  //   return filteredIssuesByLetter;
  // }

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
      <Container>
        <Container>
          <Row>
            <Col>
              <Row className={classes.Back}>
                <img
                  src={back}
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/projects");
                  }}
                />
              </Row>
            </Col>

            <Col>
              <Row className={classes.Title}>
                <h2
                  className={classes.ProjectTitle}
                  onClick={() => {
                    setPickedProject(currentProject);
                    history.push("/projectSettings");
                  }}
                >
                  {currentProject}
                </h2>
              </Row>
            </Col>

            <Col>
              <Row className={classes.Utils}>
                <div>
                  <img
                    src={plus}
                    className={classes.PlusSign}
                    onClick={(e) => {
                      e.preventDefault();
                      history.push("/createIssue");
                    }}
                  />
                  <h5> Create Issue</h5>
                </div>

                <div>
                  <img
                    src={team}
                    onClick={() => {
                      history.push("/manageteam");
                    }}
                  />
                  <h5>Team</h5>
                </div>
              </Row>
            </Col>
          </Row>
        </Container>

        <hr />

        <Container>
          <Container className={classes.StatCard}>
            <Row className="offset-0">
              <StatCard
                styleType={classes.StyleTypeOpen}
                title="Done"
                text={doneNum}
                icon={bug}
                iconClass={classes.Icon}
              />
              <StatCard
                styleType={classes.StyleTypeClosed}
                title="Open"
                text={openNum}
                icon={bug}
                iconClass={classes.Icon}
              />
              <StatCard
                styleType={classes.StyleTypeToDo}
                title="Pending"
                text={pendingNum}
                icon={bug}
                iconClass={classes.Icon}
              />
            </Row>
          </Container>
          <Container>
            <Form.Group>
              <Row>
                <Col>
                  <Form.Label as="h4">Sort Tickets:</Form.Label>
                </Col>
                <Col>
                  <Row>
                    <Form.Control
                      className='w-50 ml-4'
                      type="text"
                      placeholder="Search..."
                      onChange={(e) => {
                        // filterIssuesByLetters(
                        //   filterProjectIssues(issues),
                        //   e.target.value
                        // );
                      }}
                    />
                    <Form.Control
                      className='w-25 ml-4'
                      as="select"
                      onChange={(e) => {
                        setTicketValue(e.target.value);
                      }}
                    >
                      <option>pending</option>
                      <option>open</option>
                      <option>done</option>
                    </Form.Control>
                  </Row>
                </Col>
              </Row>
            </Form.Group>
          </Container>
          <IssueTable history={() => pushHistory()} status={ticketValue} />
        </Container>
      </Container>
    </div>
  );
}
