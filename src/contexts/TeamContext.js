import React, { createContext, useState,useContext } from "react";
import { fire } from "../Firebase";
import {DbContext} from './DbContext';

export const TeamContext = createContext();

export const TeamContextProvider = (props) => {
  const dbContextContent = useContext(DbContext);

  const setTeamData = async (
    currentProject,
    memberUid,
    memberEmail,
    memberRole,
    memberName
  ) => {
    const team = fire.database().ref("Teams");

    const template = {
      project: currentProject,
      memberUid: memberUid,
      memberEmail: memberEmail,
      memberRole: memberRole,
      memberName: memberName,
    };

    await team.push(template);
  };

  //DELETE
  const deleteTeamMember = (id) => {
    const team = fire.database().ref("Teams").child(id);
    team.remove();
    console.log("member removed");
  };
  //UPDATE
  const updateTeamMembersRole = (id, value) => {
    const team = fire.database().ref("Teams").child(id);
    team.update({
      memberRole: value,
    });
  };

  const checkIfManager = (loggedUser,projectCreatorEmail,projectRole,setManager) => {
    console.log(projectRole)
    if(loggedUser === projectCreatorEmail){
      dbContextContent.setUsersRoleInPickedProject(projectRole);
      
      setManager(true);
       
    }
  
  }

  const [memberMail, setMemberMail] = useState("");
  const [memberId, setMemberId] = useState("");
  const [membersRole, setMembersRole] = useState("");
  const [loggedUserisManager, setLoggedUserisManager] = useState(false);

  const teamContextContent = {
    setTeamData: setTeamData,
    deleteTeamMember: deleteTeamMember,
    memberMail: memberMail,
    setMemberMail: setMemberMail,
    memberId: memberId,
    setMemberId: setMemberId,
    membersRole: membersRole,
    setMembersRole: setMembersRole,
    updateTeamMembersRole: updateTeamMembersRole,
    checkIfManager: checkIfManager,
    loggedUserisManager: loggedUserisManager, 
    setLoggedUserisManager: setLoggedUserisManager
  };

  return (
    <TeamContext.Provider value={teamContextContent}>
      {props.children}
    </TeamContext.Provider>
  );
};
