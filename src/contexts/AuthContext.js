import React, { createContext, useState,useEffect } from "react";
import { fire } from "../Firebase";


export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [userId,setUserId] = useState('');


  const Login = (email, password) => {
   
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(setIsAuthorized(true))
      .then(res=>{setUserId(res.user.uid)})
      .then(console.log("logged in"))
      .catch((err) => console.log(err));
    
      
  };
  const LogOut = () => {
    
    fire
      .auth()
      .signOut()
      .then(console.log(`signed out`))
      .then(setIsAuthorized(false))
      .then(res=>{setUserId('')})
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
    <AuthContext.Provider
      value={[isAuthorized, Login, LogOut, Register,userId,setUserId]}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
