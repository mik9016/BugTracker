import React, { createContext,useState } from "react";


export const StyleContext = createContext();

export const StyleContextProvider = (props) => {

    const [createProjectMessage,setCreateProjectMessage] = useState({ display: "block" });
    const [beInvolvedInProjectMessage,setBeInvolvedInProjectMessage] = useState({ display: "none" });
    const [numberOfProjects,setNumberOfProjects] = useState([]);
    const [numberOfCreatedProjects,setNumberOfCreatedProjects] = useState([]);
    const [projectLength, setProjectLength] = useState(0);

   

    const styleCOntextContent = {
     
        setNumberOfProjects: setNumberOfProjects,
        numberOfProjects: numberOfProjects,
        numberOfCreatedProjects:numberOfCreatedProjects,
        setNumberOfCreatedProjects:setNumberOfCreatedProjects,
        projectLength:projectLength,
        setProjectLength:setProjectLength

    }

    return(
        <StyleContext.Provider value={styleCOntextContent}>{props.children}</StyleContext.Provider>
    )
}
