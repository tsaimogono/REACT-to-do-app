// src/App.js

import React, { useEffect, useState } from 'react';
import './App.css';
import { getTasks, createNewTask, patchTask, deleteTask } from './utils/taskFunctions';
import { initialData } from './utils/initialData.jsx';
import Sidebar from './components/sidebar.jsx';
import Header from './components/Header.jsx';
import TaskColumn from './components/TaskColumn.jsx';
import Modal from './components/Modal.jsx';
function App() {
  const [tasks, setTasks] = useState([]);
  const [activeBoard, setActiveBoard] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('tasks')) {
      localStorage.setItem('tasks', JSON.stringify(initialData));
      localStorage.setItem('showSideBar', 'true');
    }
    const storedTasks = getTasks();
    setTasks(storedTasks);
    const activeBoard = JSON.parse(localStorage.getItem('activeBoard')) || storedTasks[0].board;
    setActiveBoard(activeBoard);
    const theme = localStorage.getItem('light-theme') === 'enabled';
    setIsLightTheme(theme);
    document.body.classList.toggle('light-theme', theme);
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      const boards = [...new Set(tasks.map(task => task.board).filter(Boolean))];
      if (!boards.includes(activeBoard)) {
        setActiveBoard(boards[0]);
      }
    }
  }, [tasks]);

  const addTask = (task) => {
    const newTask = createNewTask(task);
    setTasks([...tasks, newTask]);
  };

  const updateTask = (taskId, updatedTask) => {
    patchTask(taskId, updatedTask);
    setTasks(tasks.map(task => (task.id === taskId ? { ...task, ...updatedTask } : task)));
  };

  const removeTask = (taskId) => {
    deleteTask(taskId);
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTheme = () => {
    const theme = !isLightTheme;
    setIsLightTheme(theme);
    localStorage.setItem('light-theme', theme ? "enabled" : "disabled");
    document.body.classList.toggle('light-theme', theme);
  };

  return (
    <div className="App">
      <Sidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        activeBoard={activeBoard}
        setActiveBoard={setActiveBoard}
        tasks={tasks}
      />
      <div className={`main-layout ${showSidebar ? '' : 'sidebar-hidden'}`}>
        <Header
          activeBoard={activeBoard}
          setModalOpen={setModalOpen}
          toggleTheme={toggleTheme}
          isLightTheme={isLightTheme}
        />
        <div className="task-columns">
          {['todo', 'doing', 'done'].map(status => (
            <TaskColumn
              key={status}
              status={status}
              tasks={tasks.filter(task => task.status === status && task.board === activeBoard)}
              setEditModalOpen={setEditModalOpen}
              setCurrentTask={setCurrentTask}
            />
          ))}
        </div>
      </div>
      {modalOpen && (
        <Modal
          type="add"
          setOpen={setModalOpen}
          addTask={addTask}
          activeBoard={activeBoard}
        />
      )}
      {editModalOpen && (
        <Modal
          type="edit"
          setOpen={setEditModalOpen}
          task={currentTask}
          updateTask={updateTask}
          removeTask={removeTask}
        />
      )}
    </div>
  );
}

export default App;

