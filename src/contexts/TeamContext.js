import React, { createContext ,useState} from "react";
import { fire } from "../Firebase";

export const TeamContext = createContext();

export const TeamContextProvider = (props) => {

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
      memberName: memberName
    };

    await team.push(template);
  };

  const getTeamData = async (setuseState) => {
    const Teams = [];
    await fire
      .database()
      .ref("Teams")
      .on("value", (snapshot) => {
        const teams = snapshot.val();

        for (let id in teams) {
          Teams.push({ id, ...teams[id] });
        }
      });

    setuseState(Teams);
    console.log("data fetched Teams");
  };

  const deleteTeamMember = (id) => {
    const team = fire.database().ref("Teams").child(id);
    team.remove();
    console.log('member removed');
  };

  const [memberMail,setMemberMail] = useState('');
  const [memberId,setMemberId] = useState('');

  const metaObject = {
      setTeamData: setTeamData,
      getTeamData: getTeamData,
      deleteTeamMember: deleteTeamMember,

  };

  return (
    <TeamContext.Provider value={[setTeamData, getTeamData,deleteTeamMember,memberMail,setMemberMail,memberId,setMemberId]}>
      {props.children}
    </TeamContext.Provider>
  );
};
