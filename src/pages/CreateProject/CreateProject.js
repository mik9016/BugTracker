import React, { useContext, useState, useRef, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Image,
  Card,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
} from "react-bootstrap";
import classes from "./CreateProject.module.scss";
import { AuthContext } from "../../contexts/AuthContext";
import { DbContext } from "../../contexts/DbContext";
import { UtilContext } from "../../contexts/UtilitiesContext";
import { useHistory } from "react-router-dom";
import { TeamContext } from "../../contexts/TeamContext";
import useGetLoggedUser from "../../Hooks/useGetLoggedUser";
import useGetUsers from "../../Hooks/useGetUsers";

export default function CreateProject() {
  const history = useHistory();

  const [projectName, setProjectName] = useState("");
  const [projectRole, setProjectRole] = useState("");
  const [projectMainUser, setProjectMainUser] = useState("");

  const name = useRef("");
  const role = useRef("");

  const [CreateNewProject, CreateNewIssue] = useContext(DbContext);

  const [clearInput, checkLog] = useContext(UtilContext);
  const [setTeamData] = useContext(TeamContext);

  const loggedUser = useGetLoggedUser();
  const Users = useGetUsers();


  return (
    <div className={classes.CreateProject}>
      <Container>
        <Card>
          <Card.Title as="h1">Create Your Project</Card.Title>
          <Form>
            <FormGroup>
              <FormLabel>Name of your Project:</FormLabel>
              <FormControl
                type="text"
                ref={name}
                placeholder="project name"
                onChange={(e) => {
                  setProjectName(e.target.value);
                }}
              />
            </FormGroup>
            <Form.Group>
              <FormLabel>Your Role:</FormLabel>
              <Form.Control
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
              className="m-2"
              type="submit"
              variant="success"
              onClick={(e) => {
                e.preventDefault();
                CreateNewProject(projectName, projectRole);
                setTeamData(
                  projectName,
                  "memberUid",
                  loggedUser.email,
                  projectRole,
                  "memberName"
                );
                clearInput(name);
                clearInput(role);
               
                history.push("/projects");
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
