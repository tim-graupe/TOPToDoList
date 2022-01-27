"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Task = Task;
exports.createNewTask = void 0;

var _manageTasks = require("./manageTasks.js");

function Task(title, description, dueDate, priority) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
}

var createNewTask = function createNewTask(project) {
  (0, _manageTasks.manageTasks)(project);
  var newTaskInput = document.createElement('input');
  var newTaskBtn = document.createElement('button');
  newTaskInput.setAttribute('class', 'input-section');
  newTaskBtn.setAttribute('class', 'input-section');
  newTaskBtn.textContent = "Send";
  projectTitle.appendChild(newTaskBtn);
  projectTitle.appendChild(newTaskInput);
  newTaskInput.addEventListener('keypress', function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      var getTask = newTaskInput.value;
      var newTask = new Task(getTask, "Add Description", "Change Due Date", "Set Priority");
      project.todos.push(newTask);
      (0, _manageTasks.manageTasks)(project);
      localStorage.setItem("tasks", JSON.stringify(_manageTasks.savedTasks));
      newTaskInput.value = '';
    }
  });
  newTaskBtn.addEventListener('click', function (e) {
    e.preventDefault();
    var getTaskName = newTaskInput.value;
    var newTask = new Task(getTaskName, "Add Description", "Change Due Date", "Set Priority");
    project.todos.push(newTask);
    (0, _manageTasks.manageTasks)(project);
    localStorage.setItem("tasks", JSON.stringify(_manageTasks.savedTasks));
    newTaskInput.value = '';
  });
  localStorage.setItem("tasks", JSON.stringify(_manageTasks.savedTasks));
};

exports.createNewTask = createNewTask;