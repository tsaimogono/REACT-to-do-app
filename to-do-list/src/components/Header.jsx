// src/components/Header.js

import React from 'react';

const Header = ({ activeBoard, setModalOpen, toggleTheme, isLightTheme }) => {
  return (
    <div className="header">
      <h1>{activeBoard}</h1>
      <button onClick={() => setModalOpen(true)}>Add New Task</button>
      <button onClick={() => toggleTheme()}>
        {isLightTheme ? 'Dark Theme' : 'Light Theme'}
      </button>
    </div>
  );
};

export default Header;
