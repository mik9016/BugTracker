import React, { createContext, useState, useContext } from "react";
import { fire } from "../Firebase";
import { AuthContext } from "../contexts/AuthContext";
import { UtilContext } from "../contexts/UtilitiesContext";

export const DbContext = createContext();

export const DbContextProvider = (props) => {
  //Variables
  const [clearInput, checkLog, setDateStamp, setTimeStamp] = useContext(
    UtilContext
  );
  const [isAuthorized, Login, LogOut, Register, userId] = useContext(
    AuthContext
  );
  const [currentProject, setCurrentProject] = useState("");
  const [pickedIssue, setPickedIssue] = useState("");
  //FUNCTIONS

  // CREATE
  const CreateNewProject = async (projectName, projectRole) => {
    const userId = fire.auth().currentUser.uid;

    const form = fire.database().ref("Projects");

    const template = {
      projectName: projectName,
      projectRole: projectRole,
    };

    await form.push(template);
    setCurrentProject(projectName);
    console.log("send to DB");
    template.projectName = "";
  };

  const CreateNewIssue = async (
    issueName,
    issueDesc,
    creator,
    currentlyWorking
  ) => {
    const userId = fire.auth().currentUser.uid;
    const form = fire.database().ref("Issues");

    const template = {
      issueName: issueName,
      issueDesc: issueDesc,
      creator: creator,
      currentlyWorking: currentlyWorking,
      project: currentProject,
      date: setDateStamp(),
      time: setTimeStamp(),
      status: "pending",
    };

    await form.push(template);
    console.log("Issue Sent");
  };

  // READ

  const getProjects = (setuseState) => {
    fire
      .database()
      .ref("Projects")
      .on("value", (snapshot) => {
        const projects = snapshot.val();

        const Projects = [];

        for (let id in projects) {
          Projects.push({ id, ...projects[id] });
        }
        setuseState(Projects);
      });
  };

  const getIssues = (setuseState) => {
    fire
      .database()
      .ref("Issues")
      .on("value", (snapshot) => {
        const issues = snapshot.val();

        const Issues = [];

        for (let id in issues) {
          Issues.push({ id, ...issues[id] });
        }
        setuseState(Issues);
      });
  };

  const statusNumHandler = (arr, setState, statusName) => {
    let sum = 0;

    arr.map((issue) => {
      if (issue.status === statusName) {
        sum++;
        setState(sum);
      }
    });
  };

  return (
    <DbContext.Provider
      value={[
        CreateNewProject,
        CreateNewIssue,
        currentProject,
        getProjects,
        getIssues,
        setCurrentProject,
        statusNumHandler,
        pickedIssue,
        setPickedIssue,
      ]}
    >
      {props.children}
    </DbContext.Provider>
  );
};
