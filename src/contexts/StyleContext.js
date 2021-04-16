import React, { createContext,useState } from "react";


export const StyleContext = createContext();

export const StyleContextProvider = (props) => {

    const [createProjectMessage,setCreateProjectMessage] = useState({ display: "block" });
    const [beInvolvedInProjectMessage,setBeInvolvedInProjectMessage] = useState({ display: "block" });
    const [numberOfProjects,setNumberOfProjects] = useState(0);

    const styleCOntextContent = {
        createProjectMessage: createProjectMessage,
        setCreateProjectMessage: setCreateProjectMessage,
        beInvolvedInProjectMessage: beInvolvedInProjectMessage,
        setBeInvolvedInProjectMessage: setBeInvolvedInProjectMessage,
        setNumberOfProjects: setNumberOfProjects,
        numberOfProjects: numberOfProjects
        
    }

    return(
        <StyleContext.Provider value={styleCOntextContent}>{props.children}</StyleContext.Provider>
    )
}
