import React, { useCallback, useEffect, useState } from 'react';
import './NoteSection.css';
import Content from './Content';
import PaperPlane from '../assets/PaperPlane.png'; 

function NoteSection({ currentGroup, noteHeadings, setNoteHeadings }) {
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const groupNotes = storedNotes.find(group => group.name === currentGroup.name);
    setNotes(groupNotes ? groupNotes.notes : []);
  }, [currentGroup]);

  useEffect(() => {
    if (currentGroup) {
      const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
      const updatedNotes = storedNotes.map(group =>
        group.name === currentGroup.name ? { ...group, notes } : group
      );
      if (!updatedNotes.some(group => group.name === currentGroup.name)) {
        updatedNotes.push({ name: currentGroup.name, notes });
      }
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }
  }, [notes, currentGroup]);

  const addNote = useCallback(() => {
    const currentDate = new Date();
    const currentTime = currentDate.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    const currentShowDate = currentDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    const newNote = {
      time: currentTime,
      date: currentShowDate,
      note: noteText,
      createdAt: currentDate.toISOString(),
      updatedAt: currentDate.toISOString(),
    };
    setNotes((prevNotes) => {
      if (!Array.isArray(prevNotes)) {
        console.error('prevNotes is not an array', prevNotes);
        return [];
      }
      return [...prevNotes, newNote];
    });

    const updatedNoteHeadings = noteHeadings.map((noteHeading) => {
      if (!Array.isArray(noteHeading.notes)) {
        console.error('noteHeading.notes is not an array', noteHeading.notes);
        return noteHeading;
      }
      return noteHeading.name === currentGroup.name
        ? { ...noteHeading, notes: [...noteHeading.notes, newNote] }
        : noteHeading;
    });
    setNoteHeadings(updatedNoteHeadings);
    setNoteText('');
  }, [currentGroup, noteHeadings, noteText, setNoteHeadings]);

  useEffect(() => {
    if (currentGroup) {
      if (!Array.isArray(currentGroup.notes)) {
        console.error('currentGroup.notes is not an array', currentGroup.notes);
        setNotes([]);
      } else {
        setNotes(currentGroup.notes);
      }
    }
  }, [currentGroup]);

  useEffect(() => {
    function handleKeyPress(e) {
      if (e.key === 'Enter' && noteText.trim() !== '') {
        addNote();
      }
    }
    window.addEventListener('keydown', handleKeyPress);

    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [addNote, noteText]);

  if (!currentGroup) {
    return <Content />;
  }

  return (
    <div className="note-section">
      <div className="group-header">
        <div className="group-icon">
          {currentGroup.letters}
        </div>
      </div>

      <div className="notes-container">
        {Array.isArray(notes) && notes.length > 0 ? (
          notes.map((note, index) => (
            <div key={index} className="note">
              <div className="note-header">
                <div className="note-time">{note.time}</div>
                <div className="note-date">{note.date}</div>
              </div>
              <div className="note-body">{note.note}</div>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
      <div className="textarea-container">
        <textarea
          cols="10"
          rows="10"
          placeholder="Enter your text here..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        ></textarea>
        <img src={PaperPlane} alt="Send" className="send-icon" onClick={addNote} />
      </div>
    </div>
  );
}

export default NoteSection;







































