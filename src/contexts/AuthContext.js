import React, { createContext, useState } from "react";
import { fire } from "../Firebase";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user,setUser] = useState('');
  
  const Login = (email, password) => {
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(setIsAuthorized(true))
      .then(console.log('logged in'))
      .then(userCredential => setUser(userCredential.user))
      .then(console.log(user))
      .catch(err => console.log(err));
  };
  const LogOut = () => {};

  const Register = (email, password) => {
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(console.log("user created"))
      .catch((err) => console.log(err));
  };

  return (
    <AuthContext.Provider value={[isAuthorized, Login, LogOut, Register]}>
      {props.children}
    </AuthContext.Provider>
  );
};
