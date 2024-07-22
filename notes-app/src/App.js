// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import SelectNotes from './Components/SelectNotes';
import CreateNote from './Components/CreateNote';
import NoteSection from './Components/NoteSection';
import Sidebar from './Components/Sidebar';
import Popup from './Components/Popup';
import Content from './Components/Content';
import NoteHeading from './Components/NoteHeading';  // Ensure this path is correct//
import { AppProvider } from './Components/AppContext';  // Ensure the correct path//

const App = () => {
    const [modal, setModal] = useState(false);
    const [noteHeadings, setNoteHeadings] = useState([]);
    const [currentGroup, setCurrentGroup] = useState(null);
    const [hide, setHide] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const storedNotes = localStorage.getItem('notes');
        if (storedNotes) {
            setNoteHeadings(JSON.parse(storedNotes));
        }
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleModal = () => setModal(!modal);

    const addGroup = (group) => {
        setNoteHeadings([...noteHeadings, group]);
        localStorage.setItem('notes', JSON.stringify([...noteHeadings, group]));
    };

    const selectGroup = (group) => {
        setCurrentGroup(group);
        if (isMobile) {
            setHide(true);
        }
    };

    return (
        <AppProvider value={{ setCurrentGroup }}>
            <div className="app">
                <Sidebar groups={noteHeadings} addGroup={addGroup} selectGroup={selectGroup} />
                {!currentGroup && <Content />}
                {currentGroup && <NoteSection currentGroup={currentGroup} noteHeadings={noteHeadings} setNoteHeadings={setNoteHeadings} />}
                {currentGroup && <NoteHeading heading={currentGroup} />} {/* Ensure the heading prop is passed */}
                {modal && <Popup closePopup={() => setModal(false)} addGroup={addGroup} />}
                <CreateNote />
                <SelectNotes />
            </div>
        </AppProvider>
    );
};

export default App;










































