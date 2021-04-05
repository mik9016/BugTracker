import React, { createContext } from "react";
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

  return (
    <TeamContext.Provider value={[setTeamData, getTeamData]}>
      {props.children}
    </TeamContext.Provider>
  );
};
