import React, { createContext, useState, useEffect } from "react";
import { fire } from "../Firebase";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setErr(err.message);
        setIsAuthorized(false);
        console.log(err.message);
       
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
      .catch((err) => {
        console.log(err);
        setErr(err);
      });
  };

  const Register = (email, password) => {
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(console.log("user created"))
      .catch((err) => {
        console.log(err.message);
        setErr(err.message);
      });
  };

  const validate = (string, inputName) => {
    let result = false;
    if (string.length < 6) {
      setErr("To short " + inputName + ". Minimum 6 characters");
      return (result = false);
    }
    return (result = true);
  };

  const validateEmail = (string) => {
    let result = false;
    if (!string.split("").includes("@")) {
      setErr("To short or incorrect email");
      return (result = false);
    }
    return (result = true);
  };

  const validateName = (string) => {
    let result = false;
    if (string.length < 3) {
      setErr("To short name. Minimum 3 characters");
      return (result = false);
    }
    return (result = true);
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
    setErr: setErr,
    err: err,
    validateEmail: validateEmail,
    validate: validate,
    loading: loading,
    setLoading: setLoading,
  };

  const bigArr = [
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
    validateName
  ];

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
        setErr,
        err,
        validateEmail,
        validate,
        loading,
        setLoading,
        validateName
      ]}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
