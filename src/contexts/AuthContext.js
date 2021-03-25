import React, { createContext, useState } from "react";
import { fire } from "../Firebase";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");

  const Login = (email, password) => {
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(setIsAuthorized(true))
      .then(console.log("logged in"))
      .then(setUserId(fire.auth().currentUser.uid))
      .catch((err) => console.log(err));
  };
  const LogOut = () => {
    fire
      .auth()
      .signOut()
      .then(console.log(`${user} signed out`))
      .then(setIsAuthorized(false))
      .catch((err) => console.log(err));

  };

  const Register = (email, password) => {
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(console.log("user created"))
      .catch((err) => console.log(err));
  };

  return (
    <AuthContext.Provider value={[isAuthorized, Login, LogOut, Register,userId]}>
      {props.children}
    </AuthContext.Provider>
  );
};
