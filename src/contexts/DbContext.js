import React, { createContext, useState, useContext } from "react";
import { fire } from "../Firebase";
import { AuthContext } from "../contexts/AuthContext";

export const DbContext = createContext();

export const DbContextProvider = (props) => {
  //Variables
  const [isAuthorized, Login, LogOut, Register,userId] = useContext(AuthContext);
  const [currentProject, setCurrentProject] = useState("");
  //FUNCTIONS

  const CreateNewProject = async (projectName, projectRole) => {
    const form = fire.database().ref("Projects/" + userId);

    const template = {
      projectName: projectName,
      projectRole: projectRole,
      issues: {},
    };

    await form.push(template);
    console.log("send to DB");
    template.projectName = "";
    setCurrentProject(projectName);
  };

  console.log(fire.database().ref("Projects"));


  const CreateNewIssue = async (
    issueName,
    issueDesc,
    creator,
    currentlyWorking
  ) => {
    const form = fire.database().ref("Projects/" + userId).child();

    const template = {
      issueName: issueName,
      issueDesc: issueDesc,
      creator: creator,
      currentlyWorking: currentlyWorking,
      project: currentProject,
    };

    await form.push(template);
    console.log("Issue Sent");
  };

  return (
    <DbContext.Provider
      value={[CreateNewProject, CreateNewIssue, currentProject]}
    >
      {props.children}
    </DbContext.Provider>
  );
};
