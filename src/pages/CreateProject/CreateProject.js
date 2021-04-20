import React, { useContext, useState, useRef, useEffect } from "react";
import {
  Container,
  Row,
  Form,
  Card,
  FormGroup,
  FormControl,
  FormLabel,
  Alert,
  Button,
} from "react-bootstrap";
import classes from "./CreateProject.module.scss";
import { DbContext } from "../../contexts/DbContext";
import { UtilContext } from "../../contexts/UtilitiesContext";
import { useHistory } from "react-router-dom";
import { TeamContext } from "../../contexts/TeamContext";
import useGetLoggedUser from "../../Hooks/useGetLoggedUser";
import useGetUsers from "../../Hooks/useGetUsers";
import back from "../../assets/back.svg";
import file from "../../assets/file.svg";
import add from "../../assets/add.svg";

export default function CreateProject() {
  const history = useHistory();

  const [projectName, setProjectName] = useState("");
  const [projectRole, setProjectRole] = useState("");
  const [projectMainUser, setProjectMainUser] = useState("");
  const [err, setErr] = useState("");

  const name = useRef("");
  const role = useRef("");

  const dbContextContent = useContext(DbContext);

  const metaObj = useContext(UtilContext);
  const teamContextContent = useContext(TeamContext);

  const loggedUser = useGetLoggedUser();
  const Users = useGetUsers();

  return (
    <div className={classes.CreateProject}>
      <Container>
        <Row>
          <img
            className={classes.Image}
            src={back}
            onClick={() => {
              history.push("/projects");
            }}
          />
        </Row>
        <Container className={classes.TitlePosition}>
          <img src={file} className={classes.FileIcon} />
          <h2>Create Your Project</h2>
        </Container>
      </Container>
      <Container className={classes.Form}>
        <Card className={classes.Card}>
          {err && (
            <Alert className="m-2" variant="danger">
              {err}
            </Alert>
          )}
          <Form>
            <FormGroup className={classes.FormGr}>
              <FormLabel className="m-4">Name of your Project:</FormLabel>
              <FormControl
                className=" w-75"
                type="text"
                ref={name}
                placeholder="project name"
                onChange={(e) => {
                  setProjectName(e.target.value);
                }}
              />
            </FormGroup>
            <Form.Group className={classes.FormGr}>
              <FormLabel className="m-2">Your Role:</FormLabel>
              <Form.Control
                className="w-75"
                as="select"
                ref={role}
                onChange={(e) => {
                  setProjectRole(e.target.value);
                }}
              >
                <option>choose your role..</option>
                <option>Manager</option>
                <option>Developer</option>
              </Form.Control>
            </Form.Group>
            <Button
              className="m-2 w-50"
              type="submit"
              variant="outline-success"
              onClick={(e) => {
                e.preventDefault();
                if (
                  metaObj.validateField(projectName, 0) &&
                  metaObj.validateField(projectRole, 0)
                ) {
                  setErr("");
                  dbContextContent.CreateNewProject(projectName, projectRole);
                  teamContextContent.setTeamData(
                    projectName,
                    "memberUid",
                    loggedUser.email,
                    projectRole,
                    "memberName"
                  );

                  metaObj.clearInput(name);
                  metaObj.clearInput(role);

                  history.push("/projects");
                } else {
                  setErr("Fields can not be empty");
                }
              }}
            >
              Create
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
}
