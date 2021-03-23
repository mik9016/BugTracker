import React, {createContext,useState,useContext} from 'react';
import {fire} from '../Firebase';
import {AuthContext} from '../contexts/AuthContext';

export const DbContext = createContext();


export const DbContextProvider = (props) => {
    //Variables
    const [isAuthorized, Login, LogOut, Register] = useContext(AuthContext)
    //FUNCTIONS
    const CreateNewProject = async (projectName,projectRole) => {
    const form = fire.database().ref("Projects");

    const template = {
        projectName: projectName,
        projectRole: projectRole
    };

    await form.push(template);
    console.log("send to DB");
    template.note = "";
    }
    return(
        <DbContext.Provider value={[CreateNewProject]}>{props.children}</DbContext.Provider>
    )
}