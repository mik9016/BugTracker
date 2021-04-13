import React, { createContext, useState, useEffect } from "react";
import { fire } from "../Firebase";
import useGetLoggedUser from "../Hooks/useGetLoggedUser";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userRole, setUserRole] = useState("");

  const Login = (email, password) => {
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(setIsAuthorized(true))
      .then((res) => {
        setUserId(res.user.uid);
        setEmail(res.user.email);
      
      })
      .then(console.log("logged in"))
      .catch((err) => {
        setIsAuthorized(false);
        console.log(err);
      });
  };
  const LogOut = () => {
    fire
      .auth()
      .signOut()
      .then(console.log(`signed out`))
      .then(setIsAuthorized(false))
      .then((res) => {
        setUserId("");
        setEmail("");
      })
      .catch((err) => console.log(err));
  };

  const Register = (email, password) => {
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(console.log("user created"))
      .catch((err) => console.log(err));
  };

  const authContextContent = {
    isAuthorized: isAuthorized,
    Login: Login,
    LogOut: LogOut,
    Register: Register,
    userId: userId,
    setUserId: setUserId,
    userName: userName,
    userEmail: userEmail,
  };

  return (
    <AuthContext.Provider
      value={[
        isAuthorized,
        Login,
        LogOut,
        Register,
        userId,
        setUserId,
        userName,
        userEmail,
      ]}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
