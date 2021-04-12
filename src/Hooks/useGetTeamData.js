import { useState, useEffect } from "react";
import { fire } from "../Firebase";

function useGetTeamData(flag) {
  const [data, setData] = useState([]);
  const [teamsy, setTeamsy] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const getTeamData = async () => {
      let Teams = [];

      await fire
        .database()
        .ref("Teams")
        .on("value", (snapshot) => {
          const teams = snapshot.val();
          for (let id in teams) {
            Teams.push({ id, ...teams[id] });
          }
        });

      setData(Teams);
      // console.log("data fetched Teams");
    };

    getTeamData();

    // return () => {
    //   isMounted = false;
    //   getTeamData();
    // };
  }, [flag]);
  // console.log(data);
  return data;
}

export default useGetTeamData;
