import React, { createContext, useState, useContext } from "react";
import { fire } from "../Firebase";
import { AuthContext } from "../contexts/AuthContext";
import {UtilContext} from '../contexts/UtilitiesContext';

export const DbContext = createContext();

export const DbContextProvider = (props) => {
  //Variables
  const [clearInput,checkLog,setDateStamp,setTimeStamp] = useContext(UtilContext);
  const [isAuthorized, Login, LogOut, Register,userId] = useContext(AuthContext);
  const [currentProject, setCurrentProject] = useState("");
  //FUNCTIONS

  // CREATE 
  const CreateNewProject = async (projectName, projectRole) => {
    const userId = fire.auth().currentUser.uid;

    const form = fire.database().ref("Projects");

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

  


  const CreateNewIssue = async (
    issueName,
    issueDesc,
    creator,
    currentlyWorking,

  ) => {
    const userId = fire.auth().currentUser.uid;
    const form = fire.database().ref("Issues");

    const template = {
      issueName: issueName,
      issueDesc: issueDesc,
      creator: creator,
      currentlyWorking: currentlyWorking,
      project: 'Hardcoded Project',
      date: setDateStamp(),
      time: setTimeStamp()

    };

    await form.push(template);
    console.log("Issue Sent");
  };

  // READ

  const getProjects = (setuseState) => {
    fire.database().ref('Projects').on('value', (snapshot)=> {
      const projects = snapshot.val();

      const Projects = [];

      for(let id in projects){
        Projects.push({ id, ...projects[id] })
      }
      setuseState(Projects)
    })
  };

  
  const getIssues = (setuseState) => {
    fire.database().ref('Issues').on('value', (snapshot)=> {
      const issues = snapshot.val();

      const Issues = [];

      for(let id in issues){
        Issues.push({ id, ...issues[id] })
      }
      setuseState(Issues)
    })
  };

  return (
    <DbContext.Provider
      value={[CreateNewProject, CreateNewIssue, currentProject,getProjects,getIssues]}
    >
      {props.children}
    </DbContext.Provider>
  );
};
