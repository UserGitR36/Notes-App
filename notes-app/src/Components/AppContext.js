import React, { createContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [modal, setModal] = useState(false);
    const [noteHeadings, setNoteHeadings] = useState([]);
    const [currentGroup, setCurrentGroup] = useState(null);
    const [hide, setHide] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const contextValue = {
        modal,
        setModal,
        noteHeadings,
        setNoteHeadings,
        currentGroup,
        setCurrentGroup,
        hide,
        setHide,
        isMobile,
        setIsMobile
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;





