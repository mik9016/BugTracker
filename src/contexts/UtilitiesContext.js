import React, { createContext } from "react";


export const UtilContext = createContext();

export const UtilContextProvider = (props) => {
  
   const clearInput = (inputRef) => {
    inputRef.current.value = '';
   };

   const checkLog = (email, password, name) => {
    console.log(`mail: ${email} , pass: ${password}, name: ${name}`);
  };

 


  return (
    <UtilContext.Provider value={[clearInput,checkLog]}>
      {props.children}
    </UtilContext.Provider>
  );
};