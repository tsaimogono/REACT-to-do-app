// src/utils/taskFunctions.js

export function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  }
  
  export function createNewTask(task) {
    const tasks = getTasks();
    task.id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return task;
  }
  
  export function patchTask(taskId, updatedTask) {
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
  
  export function putTask(taskId, updatedTask) {
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      tasks[taskIndex] = updatedTask;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
  
  export function deleteTask(taskId) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  