import React, { createContext } from "react";


export const UtilContext = createContext();

export const UtilContextProvider = (props) => {
  

  const clearInput = (inputRef) => {
    inputRef.current.value = "";
  };

  const checkLog = (email, password, name) => {
    console.log(`mail: ${email} , pass: ${password}, name: ${name}`);
  };
  //DATE HANDLING

  const validateDateAndTimeFormat = (timeUnit) => {
    if (timeUnit < 10) {
      return "0" + timeUnit;
    } else {
      return timeUnit;
    }
  };

  const setDay = (date) => {
    const today = date.getDate();
    return validateDateAndTimeFormat(today);
  };
  const setMonth = (date) => {
    const month = date.getMonth() + 1;
    return validateDateAndTimeFormat(month);
  };

  const setDateStamp = () => {
    const date = new Date();
    const today = setDay(date);
    const month = setMonth(date);
    const year = date.getFullYear();

    return `${today}.${month}.${year}`; 
  };
  //TIME HANDLING
  const SetHour = (date) => {
    const hour = date.getHours();

    return validateDateAndTimeFormat(hour);
  };
  const SetMinute = (date) => {
    const min = date.getMinutes();
    return validateDateAndTimeFormat(min);
  };
  const SetSecund = (date) => {
    const sec = date.getSeconds();
    return validateDateAndTimeFormat(sec);
  };

  const setTimeStamp = () => {
    const date = new Date();
    const hour = SetHour(date);
    const minute = SetMinute(date);
    const sec = SetSecund(date);
    return `${hour}:${minute}:${sec}`;
  };
  



  return (
    <UtilContext.Provider
      value={[clearInput, checkLog, setDateStamp, setTimeStamp]}
    >
      {props.children}
    </UtilContext.Provider>
  );
};
