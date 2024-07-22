import React, { useState } from 'react';
import './Sidebar.css';
import Popup from './Popup';
import CreateNote from './CreateNote';
import SelectNotes from './SelectNotes';

const Sidebar = ({ groups, addGroup, selectGroup, noteHeadings, toggleModal, hide }) => {
  const [showPopup, setShowPopup] = useState(false);

  const getGroupIcon = (groupName) => {
    return groupName.slice(0, 2).toUpperCase();
  };

  return (
    <div className="sidebar">
      <h1 className="sidebar-heading">Pocket Notes</h1>
      <CreateNote />  {/* Added to provide note creation functionality */}
      <SelectNotes  // Added to handle note selection //
        toggleModal={toggleModal}
        noteHeadings={noteHeadings}
        hide={hide}
      />
      <button className="create-notes-button" onClick={() => setShowPopup(true)}>
        + Create Notes group
      </button>
      {groups.map((group, index) => (
        <div
          key={index}
          className="note-item"
          onClick={() => selectGroup(group)}
        >
          <span
            className="note-icon"
            style={{ backgroundColor: group.color }}  
          >
            {getGroupIcon(group.name)}
          </span>
          {group.name}
        </div>
      ))}
      {showPopup && (
        <Popup closePopup={() => setShowPopup(false)} addGroup={addGroup} />
      )}
    </div>
  );
};

export default Sidebar;
















