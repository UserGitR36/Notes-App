import React, { useContext } from 'react';
import AppContext from './AppContext';  
import './NoteHeading.css';

const NoteHeading = ({ heading }) => {
    const { setCurrentGroup } = useContext(AppContext);

    if (!heading) {
        return null; 
    }

  
    const icon = heading.icon || heading.name.substring(0, 2).toUpperCase();  

    return (
        <div className="note-heading-container">
            <div
                className="note-icon"
                style={{ backgroundColor: heading.color }}  
                onClick={() => setCurrentGroup(heading)}
                aria-label={`Select group ${heading.name}`}
                role="button"
            >
                {icon}
            </div>
            <div className="note-name">{heading.name}</div>
        </div>
    );
};

export default NoteHeading;


















