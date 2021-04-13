import { useState, useEffect, useContext } from "react";
import { fire } from "../Firebase";
import { AuthContext } from "../contexts/AuthContext";

function useGetPhoto() {
  const [
    isAuthorized,
    Login,
    LogOut,
    Register,
    userId,
    setUserId,
    userName,
    userEmail,
  ] = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [photURl, setPhotURl] = useState([]);
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
    };

    getUsersData();

    // return () => {
    //   isMounted = false;
    // };
  },[]);


  console.log(data.userEmail);
  if (data.userEmail === userEmail) {
    return setPhotURl(data.photo);
  }

  console.log(photURl);
  return photURl;
}

export default useGetPhoto;
