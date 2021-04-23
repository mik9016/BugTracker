import React, { useContext, useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import StatCard from "../../components/StatCard/StatCard";
import classes from "../Dashboard/Dashboard.module.scss";
import { Container, Row, Form, Col } from "react-bootstrap";
import IssueTable from "../../components/IssueTable/IssueTable";
import { DbContext } from "../../contexts/DbContext";
import { TeamContext } from "../../contexts/TeamContext";
import back from "../../assets/back.svg";
import plus from "../../assets/plus.svg";
import team from "../../assets/team.svg";
import bug from "../../assets/bug.png";

export default function Dashboard() {
  const history = useHistory();
  const searchFieldRef = useRef();
  const pushHistory = () => {
    history.push("/details");
  };

  const dbContextContent = useContext(DbContext);
  const teamContextContent = useContext(TeamContext);

  const [ticketValue, setTicketValue] = useState("pending");
  const [issues, setIssues] = useState([]);
  const [projects, setProjects] = useState([]);
  const [pendingNum, setPendingNum] = useState(0);
  const [openNum, setOpenNum] = useState(0);
  const [doneNum, setDoneNum] = useState(0);

  const [filteredByWord, setFilteredByWord] = useState([]);
  const [searchFieldStatusIsEmpty, setSearchFieldStatusIsEmpty] = useState(
    true
  );

  // SORTING FUNCTIONS
  function filterProjectIssues(arr) {
    let filteredIssues = [];
    arr.map((issue) => {
      if (issue.project === dbContextContent.currentProject) {
        filteredIssues.push(issue);
      }
    });
    return filteredIssues;
  }

  function filterIssuesByLetters(arr, string) {
    let filteredIssuesByLetter = [];
    if (string.length !== 0) {
      arr.map((issueName) => {
        if (
          issueName.issueName.toLowerCase().includes(string) &&
          issueName.status === ticketValue
        ) {
          filteredIssuesByLetter.push(issueName);
        }
      });
    }

    return filteredIssuesByLetter;
  }
  //GET NUMBERS OF ISSUES
  useEffect(() => {
    dbContextContent.getIssues(setIssues);
    return () => {
      dbContextContent.getIssues(setIssues);
    };
  }, []);
  //FILTER ISSUES BY STATUS
  useEffect(() => {
    dbContextContent.statusNumHandler(
      filterProjectIssues(issues),
      setPendingNum,
      "pending"
    );
    dbContextContent.statusNumHandler(
      filterProjectIssues(issues),
      setOpenNum,
      "open"
    );
    dbContextContent.statusNumHandler(
      filterProjectIssues(issues),
      setDoneNum,
      "done"
    );
    return () => {
      dbContextContent.statusNumHandler(
        filterProjectIssues(issues),
        setPendingNum,
        "pending"
      );
      dbContextContent.statusNumHandler(
        filterProjectIssues(issues),
        setOpenNum,
        "open"
      );
      dbContextContent.statusNumHandler(
        filterProjectIssues(issues),
        setDoneNum,
        "done"
      );
    };
  }, [issues]);

  const FilteredIssueNames = filteredByWord.map((x) => {
    return x.issueName;
  });
  // console.log(FilteredIssueNames);
  return (
    <div className={classes.Dashboard}>
      <Container >
        <Container className={classes.ResponsiveHead}>
          <Row>
            <Col>
              <Row className={classes.Back}>
                <img
                  className={classes.Hover}
                  src={back}
                  onClick={(e) => {
                    e.preventDefault();
                    teamContextContent.setLoggedUserisManager(false);
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
                    dbContextContent.setPickedProject(
                      dbContextContent.currentProject
                    );
                    history.push("/projectSettings");
                  }}
                >
                  {dbContextContent.currentProject}
                </h2>
              </Row>
            </Col>
           
            <Col className={classes.HandyUtils}>
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
                    className={classes.Hover}
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

        <Container >
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
                      className="w-50 ml-4"
                      type="text"
                      ref={searchFieldRef}
                      placeholder="Search Title..."
                      onChange={(e) => {
                        //CHECK IF SEARCH FIELD IS EMPTY
                        e.target.value.length > 0
                          ? setSearchFieldStatusIsEmpty(false)
                          : setSearchFieldStatusIsEmpty(true);
                        //SET
                        setFilteredByWord(
                          filterIssuesByLetters(
                            filterProjectIssues(issues),
                            e.target.value
                          )
                        );
                      }}
                    />
                    <Form.Control
                      className="w-25 ml-4"
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
          <IssueTable
            history={() => pushHistory()}
            status={ticketValue}
            filter={FilteredIssueNames}
            filteredByLetter={filteredByWord}
            searchFieldIsEmpty={searchFieldStatusIsEmpty}
          />
        </Container>
      </Container>
    </div>
  );
}
