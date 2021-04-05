import React, { useEffect, useState } from "react";
import { fire } from "../Firebase";

export default function useGetLoggedUser() {
  const [user, setUser] = useState();
  let flag;

  useEffect(() => {
    flag = true;

    const getLoggedUser = async () => {
      await setUser(fire.auth().currentUser);
    };

    getLoggedUser();

    return () => {
      getLoggedUser();
      flag = false;
    };
  }, []);

  return user;
}
