"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.manageTasks = void 0;

var _createProject = require("./createProject.js");

var savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

var manageTasks = function manageTasks(project) {
  JSON.stringify(_createProject.projects);

  while (_createProject.currentProject.firstChild) {
    _createProject.currentProject.removeChild(_createProject.currentProject.firstChild);
  } //add displaying descriptions here? (below?)


  project.todos.forEach(function (todo) {
    var li = document.createElement('li');
    var deleteBtn = document.createElement('div');
    deleteBtn.setAttribute('class', 'material-icons');
    deleteBtn.textContent = 'delete';
    var editBtn = document.createElement('div');
    editBtn.setAttribute('class', 'material-icons');
    editBtn.textContent = 'edit';
    var setPriority = document.createElement('div');
    setPriority.setAttribute('class', 'material-icons');
    setPriority.textContent = 'priority_high';
    var completeTask = document.createElement('div');
    completeTask.setAttribute('class', 'material-icons');
    completeTask.textContent = 'done_outline';
    var dueDate = document.createElement('date');
    dueDate.setAttribute('class', 'material-icons');
    dueDate.textContent = 'event';
    li.textContent = todo.title;
    li.className = 'addedTask';
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    li.appendChild(setPriority);
    li.appendChild(completeTask);
    li.appendChild(dueDate);

    _createProject.currentProject.appendChild(li);

    savedTasks.push(todo);
    deleteBtn.addEventListener('click', function () {
      for (var i = project.todos.length - 1; i >= 0; i--) {
        if (project.todos[i].title === todo.title) {
          project.todos.splice(i, 1);

          _createProject.currentProject.removeChild(li);

          localStorage.setItem("tasks", JSON.stringify(savedTasks));
          localStorage.setItem('projects', JSON.stringify(_createProject.projects));
        }

        ;
      }

      ;
    });
    editBtn.addEventListener('click', function () {
      todo.title = prompt('Change name');

      if (todo.title.length > 0) {
        li.textContent = todo.title;
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
        localStorage.setItem('projects', JSON.stringify(_createProject.projects));
      } else if (todo.title == null) {
        return;
      }
    });
    setPriority.addEventListener('click', function () {
      if (setPriority.style.color == 'red') {
        setPriority.style.color = 'yellow';
        todo.priority = 'Medium';
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
        localStorage.setItem('projects', JSON.stringify(_createProject.projects));
      } else if (setPriority.style.color == 'yellow') {
        setPriority.style.color = 'green';
        todo.priority = 'Low';
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
        localStorage.setItem('projects', JSON.stringify(_createProject.projects));
      } else {
        setPriority.style.color = 'red';
        todo.priority = 'High';
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
        localStorage.setItem('projects', JSON.stringify(_createProject.projects));
      }
    });
    completeTask.addEventListener('click', function () {
      if (li.style.textDecoration == 'none') {
        li.style.textDecoration = 'line-through';
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
        localStorage.setItem('projects', JSON.stringify(_createProject.projects));
      } else {
        li.style.textDecoration = 'none';
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
        localStorage.setItem('projects', JSON.stringify(_createProject.projects));
      }
    });
    dueDate.addEventListener('click', function () {
      var date = new Date();
      console.log(date);
    });
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
    localStorage.setItem('projects', JSON.stringify(_createProject.projects));
  });
};

exports.manageTasks = manageTasks;