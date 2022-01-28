"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.projectFactory = exports.createNewProject = exports.appendToSidebarList = exports.createProject = exports.projects = exports.currentProject = void 0;

var _createTask = require("./createTask.js");

var _manageTasks = require("./manageTasks.js");

var createProject = document.getElementById('new-project-btn');
exports.createProject = createProject;
var projects = JSON.parse(localStorage.getItem('projects')) || [];
exports.projects = projects;
var projectList = document.getElementById('project-list');
var currentProject = document.getElementById('current-project-tasks');
exports.currentProject = currentProject;
var projectTitle = document.getElementById('current-project-title');
projectTitle.setAttribute('id', 'projectTitle');
createProject.addEventListener('click', function () {
  createNewProject();
}, false);

var projectFactory = function projectFactory(title) {
  var todos = [];
  return {
    title: title,
    todos: todos
  };
};

exports.projectFactory = projectFactory;

var createNewProject = function createNewProject() {
  var getTitle = prompt("Project name?");

  if (getTitle == "") {
    alert("Empty field!");
  } else if (projects.some(function (project) {
    return project.title == getTitle;
  })) {
    alert("Duplicate project name!");
  } else {
    var newProject = projectFactory(getTitle);
    projects.push(newProject);
    appendToSidebarList(newProject);
    localStorage.setItem('projects', JSON.stringify(projects));
  }
};

exports.createNewProject = createNewProject;

var appendToSidebarList = function appendToSidebarList(project) {
  var node = document.createElement('li');
  var editBtn = document.createElement('div');
  var deleteBtn = document.createElement('div');
  editBtn.setAttribute('class', 'material-icons');
  editBtn.textContent = 'edit';
  deleteBtn.textContent = 'delete';
  deleteBtn.setAttribute('class', 'material-icons');
  node.setAttribute('id', 'list-node');
  node.textContent = project.title;
  node.appendChild(editBtn);
  node.appendChild(deleteBtn);
  projectList.appendChild(node);
  node.addEventListener('click', function () {
    projectTitle.textContent = project.title;
    (0, _createTask.createNewTask)(project);
  });
  editBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    project.title = prompt('Change name');

    if (project.title.length > 0) {
      node.textContent = project.title;
      node.appendChild(editBtn);
      node.appendChild(deleteBtn);
      localStorage.setItem("tasks", JSON.stringify(_manageTasks.savedTasks));
      localStorage.setItem('projects', JSON.stringify(projects));
    } else if (project.title == null) {
      return;
    }
  });
  deleteBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    var text = 'Are you sure you wish to delete your ' + project.title + ' project?';

    if (confirm(text) == true) {
      for (var i = projects.length - 1; i >= 0; i--) {
        if (projects[i].title === project.title) {
          projects.splice(i, 1);
          projectList.removeChild(node);
          localStorage.setItem("tasks", JSON.stringify(_manageTasks.savedTasks));
          localStorage.setItem('projects', JSON.stringify(projects));
        }
      }
    } else {
      return;
    }
  });
};

exports.appendToSidebarList = appendToSidebarList;
projects.forEach(appendToSidebarList);