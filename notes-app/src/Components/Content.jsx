import React from 'react';
import './Content.css';
import image1 from '../assets/image1.png'; 
import CreateNote from './CreateNote';
import SelectNotes from './SelectNotes';

const Content = () => {
  return (
    <div className="content">
      <img src={image1} alt="image1" className="center-image" />
      <h1 className="content-heading">Pocket Notes</h1>
      <p className="content-text">
        Send and receive messages without keeping your phone online.
      </p>
      <p className="content-text">
        Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
      </p>
      <p className="content-encryption">
        <span className="lock-symbol">🔒</span> end-to-end encrypted
      </p>
      <CreateNote />
      <SelectNotes />
    </div>
  );
};

export default Content;






