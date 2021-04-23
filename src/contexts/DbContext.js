import React, { createContext, useState, useContext } from "react";
import { fire } from "../Firebase";
import { AuthContext } from "../contexts/AuthContext";
import { UtilContext } from "../contexts/UtilitiesContext";
import bug from '../assets/bug.png';

export const DbContext = createContext();

export const DbContextProvider = (props) => {
  //Variables
  const metaObj = useContext(UtilContext);
  const [
    isAuthorized,
    Login,
    LogOut,
    Register,
    userId,
    setUserId,
    userName,
    userEmail,
    setErr,
    err,
    validateEmail,
    validate,
    loading,
    setLoading,
  ] = useContext(AuthContext);

  const [currentProject, setCurrentProject] = useState("");
  const [pickedIssue, setPickedIssue] = useState("");
  let [pickedIssueTitle, setPickedIssueTitle] = useState("");
  const [pickedIssueStatus, setPickedIssueStatus] = useState("");
  const [pickedIssueId, setPickedIssueId] = useState("");
  let [pickedIssueWorker, setPickedIssueWorker] = useState("");
  const [pickedProject, setPickedProject] = useState("");
  const [pickedProjectId, setPickedProjectId] = useState("");
  const [usersRoleInPickedProject, setUsersRoleInPickedProject] = useState("");
  const [loggedUserEmail, setLoggedUserEmail] = useState("");
  const [loggedUserPhoto, setLoggedUserPhoto] = useState('');
  const [loggedUserName, setLoggedUserName] = useState("");
  const [loggedUserId, setLoggedUserId] = useState("");
  
  //FUNCTIONS

  // CREATE
  const CreateNewProject = async (projectName, projectRole) => {
    const userId = fire.auth().currentUser.uid;

    const form = fire.database().ref("Projects");

    const template = {
      projectName: projectName,
      projectRole: projectRole,
      user: userId,
      creatorEmail: userEmail,
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
      date: metaObj.setDateStamp(),
      time: metaObj.setTimeStamp(),
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
  //UPDATE ISSUES
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

  const changeIssueWorker = (id, value) => {
    const desc = fire.database().ref("Issues").child(id);

    desc.update({
      currentlyWorking: value,
    });
  };
  // UPDATE PROJECT NAME IN ISSUES
  const changeIssueProjectName = (id, value) => {
    const issue = fire.database().ref("Issues").child(id);
    issue.update({
      project: value,
    });
  };

  const changeProjectTitle = (id, value) => {
    const desc = fire.database().ref("Projects").child(id);

    desc.update({
      projectName: value,
    });
  };
  //DELETE
  const deleteProjectTitle = (id) => {
    const project = fire.database().ref("Projects").child(id);

    project.remove();
  };

  const deleteIssue = (id) => {
    const issue = fire.database().ref("Issues").child(id);

    issue.remove();
  };

  //SET USER
  const setUserInDB = async (userMail, userName) => {
    const form = fire.database().ref("Users");

    const template = {
      userEmail: userMail,
      userName: userName,
      role: "",
      projects: [],
      photo: "",
    };

    await form.push(template);
  };

  //GET USERS LIST

  const getUsersListFromDB = async (setuseState) => {
    const Users = [];
    await fire
      .database()
      .ref("Users")
      .on("value", (snapshot) => {
        const users = snapshot.val();

        for (let id in users) {
          Users.push({ id, ...users[id] });
        }
      });

    await setuseState(Users);

    return Users;
  };

  //UPDATE ROLE OF USER

  const updateUsersRole = (id, value) => {
    const desc = fire.database().ref("Users").child(id);

    desc.update({
      role: value,
    });
  };
  // UDATE USERS PHOTO
  const updateUsersPhoto = (id, value) => {
    const desc = fire.database().ref("Users").child(id);

    desc.update({
      photo: value,
    });
  };

  const updateUserName = (id, value) => {
    const desc = fire.database().ref("Users").child(id);

    desc.update({
      userName: value,
    });
  };

  const updateUserProjects = (id, value) => {
    const desc = fire.database().ref("Users").child(id);

    desc.update({
      projects: [].push(value),
    });
  };

  const getLoggedUserId = (arr, mail) => {
    arr.map((user) => {
      if (user.userEmail === mail) {
        setLoggedUserId(user.id);
      }
    });
  };

  

  const dbContextContent = {
    CreateNewProject: CreateNewProject,
    CreateNewIssue: CreateNewIssue,
    currentProject: currentProject,
    getProjects: getProjects,
    getIssues: getIssues,
    setCurrentProject: setCurrentProject,
    statusNumHandler: statusNumHandler,
    pickedIssue: pickedIssue,
    setPickedIssue: setPickedIssue,
    pickedIssueTitle: pickedIssueTitle,
    setPickedIssueTitle: setPickedIssueTitle,
    pickedIssueStatus: pickedIssueStatus,
    setPickedIssueStatus: setPickedIssueStatus,
    pickedIssueId: pickedIssueId,
    setPickedIssueId: setPickedIssueId,
    changeIssueDescription: changeIssueDescription,
    changeIssueStatus: changeIssueStatus,
    changeIssueTitle: changeIssueTitle,
    changeProjectTitle: changeProjectTitle,
    pickedProject: pickedProject,
    setPickedProject: setPickedProject,
    pickedProjectId: pickedProjectId,
    setPickedProjectId: setPickedProjectId,
    setUserInDB: setUserInDB,
    getUsersListFromDB: getUsersListFromDB,
    updateUsersRole: updateUsersRole,
    updateUserProjects: updateUserProjects,
    pickedIssueWorker: pickedIssueWorker,
    setPickedIssueWorker: setPickedIssueWorker,
    changeIssueWorker: changeIssueWorker,
    deleteProjectTitle: deleteProjectTitle,
    deleteIssue: deleteIssue,
    usersRoleInPickedProject: usersRoleInPickedProject,
    setUsersRoleInPickedProject: setUsersRoleInPickedProject,
    changeIssueProjectName: changeIssueProjectName,
    updateUsersPhoto: updateUsersPhoto,
    loggedUserEmail: loggedUserEmail,
    setLoggedUserEmail: setLoggedUserEmail,
    loggedUserPhoto: loggedUserPhoto,
    setLoggedUserPhoto: setLoggedUserPhoto,
    loggedUserName: loggedUserName,
    setLoggedUserName: setLoggedUserName,
    updateUserName: updateUserName,
    loggedUserId: loggedUserId,
    setLoggedUserId: setLoggedUserId,
    getLoggedUserId: getLoggedUserId,
    
  };

  return (
    <DbContext.Provider value={dbContextContent}>
      {props.children}
    </DbContext.Provider>
  );
};
