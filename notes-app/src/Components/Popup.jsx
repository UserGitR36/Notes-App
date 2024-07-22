import React, { useState } from 'react';
import './Popup.css';

const colors = [
  { name: 'blue', color: '#0047FF' },
  { name: 'purple', color: '#B38BFA' },
  { name: 'pink', color: '#FFC0C0' },
  { name: 'lightblue', color: '#43E6FC' },
  { name: 'red', color: '#F19576' },
  { name: 'teal', color: '#6691FF' },
  { name: 'orange', color: '#FF66F0' },
];

const Popup = ({ closePopup, addGroup }) => {
  const [groupName, setGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0].color);

  const handleAddGroup = () => {
    if (groupName.trim()) {
      addGroup({ name: groupName.trim(), color: selectedColor });
      setGroupName('');
      closePopup();
    }
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains('popup-overlay')) {
      closePopup();
    }
  };

  return (
    <div className="popup-overlay" onClick={handleClickOutside}>
      <div className="popup">
        <h2>Create New Notes Group</h2>
        <div className="form-group">
          <label htmlFor="group-name" className="input-label">Group Name</label>
          <input
            id="group-name"
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter your group name..."
            className="group-name-input"
          />
        </div>
        <div className="form-group color-section">
          <label htmlFor="color-picker" className="input-label color-picker-label">Choose Color</label>
          <div className="color-picker" id="color-picker">
            {colors.map((color) => (
              <div
                key={color.name}
                className={`color-circle ${selectedColor === color.color ? 'selected' : ''}`}
                style={{ backgroundColor: color.color }}
                onClick={() => setSelectedColor(color.color)}
              ></div>
            ))}
          </div>
        </div>
        <button onClick={handleAddGroup} className="create-button">Create</button>
      </div>
    </div>
  );
};

export default Popup;

















