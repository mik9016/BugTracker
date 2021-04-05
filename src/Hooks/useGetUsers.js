import { useState, useEffect } from "react";
import { fire } from "../Firebase";

function useGetUsers() {
  const [data, setData] = useState([]);
  let isMounted = true;

  useEffect(() => {
    const getUsersData = async () => {
      let Teams = [];

      await fire
        .database()
        .ref("Users")
        .on("value", (snapshot) => {
          const teams = snapshot.val();

          for (let id in teams) {
            Teams.push({ id, ...teams[id] });
          }
        });

      setData(Teams);
      console.log("data fetched - Users");
    };

    getUsersData();

    return () => {
      
      isMounted = false;
    };
  }, []);
 
  return data;
}

export default useGetUsers;
