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
  let [pickedIssueTitle, setPickedIssueTitle] = useState("");
  const [pickedIssueStatus, setPickedIssueStatus] = useState("");
  const [pickedIssueId, setPickedIssueId] = useState("");

  const [pickedProject, setPickedProject] = useState("");
  const [pickedProjectId, setPickedProjectId] = useState("");

  //FUNCTIONS

  // CREATE
  const CreateNewProject = async (projectName, projectRole) => {
    const userId = fire.auth().currentUser.uid;

    const form = fire.database().ref("Projects");

    const template = {
      projectName: projectName,
      projectRole: projectRole,
      user: userId,
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
  // HANDLE STATS
  const statusNumHandler = (arr, setState, statusName) => {
    let sum = 0;

    arr.map((issue) => {
      if (issue.status === statusName) {
        sum++;
        setState(sum);
      }
    });
  };
  //UPDATE
  const changeIssueDescription = (id, value) => {
    const desc = fire.database().ref("Issues").child(id);

    desc.update({
      issueDesc: value,
    });
  };

  const changeIssueStatus = (id, value) => {
    const desc = fire.database().ref("Issues").child(id);

    desc.update({
      status: value,
    });
  };

  const changeIssueTitle = (id, value) => {
    const desc = fire.database().ref("Issues").child(id);

    desc.update({
      issueName: value,
    });
  };

  const changeProjectTitle = (id, value) => {
    const desc = fire.database().ref("Projects").child(id);

    desc.update({
      projectName: value,
    });
  };
  //SET USER
  const setUserInDB = async (userMail,userName) => {
   const form = fire.database().ref('Users');

   const template = {
     userEmail:userMail,
     userName:userName,
     role:''
   }

   await form.push(template)
  }

  //GET USERS LIST

  const getUsersListFromDB = async (setuseState) => {
   await fire.database().ref('Users')
    .on("value", (snapshot) => {
      const users = snapshot.val();

      const Users = [];

      for (let id in users) {
        Users.push({ id, ...users[id] });
      }
      setuseState(Users);
    });
  };

  //UPDATE ROLE OF USER

  
  const updateUsersRole = (id, value) => {
    const desc = fire.database().ref("Users").child(id);

    desc.update({
      role: value,
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
        updateUsersRole
      ]}
    >
      {props.children}
    </DbContext.Provider>
  );
};
