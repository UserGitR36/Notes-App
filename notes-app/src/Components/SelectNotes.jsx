import React, { useContext } from 'react';
import AppContext from './AppContext'; 
import NoteHeading from './NoteHeading'; 

const SelectNotes = () => {
    const { modal, toggleModal, noteHeadings, hide } = useContext(AppContext);

    return (
        <div>
            {noteHeadings.map((heading, index)=> (
                <NoteHeading key={index} heading={heading} />
            ))}
        </div>
    );
};

export default SelectNotes;



















