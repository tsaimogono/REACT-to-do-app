// src/components/Modal.js

import React, { useState, useEffect } from 'react';

const Modal = ({ type, setOpen, addTask, task, updateTask, removeTask, activeBoard }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');

  useEffect(() => {
    if (type === 'edit' && task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    }
  }, [type, task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'add') {
      const newTask = {
        id: '', // This will be set in the createNewTask function
        title,
        description,
        status,
        board: activeBoard,
      };
      addTask(newTask);
    } else if (type === 'edit' && task) {
      const updatedTask = {
        ...task,
        title,
        description,
        status,
      };
      updateTask(task.id, updatedTask);
    }
    setOpen(false);
  };

  const handleDelete = () => {
    if (task && task.id) {
      removeTask(task.id);
      setOpen(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{type === 'add' ? 'Add New Task' : 'Edit Task'}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="todo">To Do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className="modal-buttons">
            <button type="submit">{type === 'add' ? 'Add Task' : 'Save Changes'}</button>
            <button type="button" onClick={() => setOpen(false)}>Cancel</button>
            {type === 'edit' && (
              <button type="button" onClick={handleDelete}>Delete Task</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
