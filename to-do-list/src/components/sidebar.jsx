// src/components/Sidebar.js

import React from 'react';

const Sidebar = ({ showSidebar, setShowSidebar, activeBoard, setActiveBoard, tasks }) => {
  const boards = [...new Set(tasks.map(task => task.board).filter(Boolean))];

  return (
    <div className={`sidebar ${showSidebar ? '' : 'hidden'}`}>
      <div className="logo">Task Manager</div>
      <div className="boards-nav-links-div">
        {boards.map(board => (
          <button
            key={board}
            className={`board-btn ${board === activeBoard ? 'active' : ''}`}
            onClick={() => {
              setActiveBoard(board);
              localStorage.setItem("activeBoard", JSON.stringify(board));
            }}
          >
            {board}
          </button>
        ))}
      </div>
      <div className="sidebar-footer">
        <button onClick={() => setShowSidebar(!showSidebar)}>
          {showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
