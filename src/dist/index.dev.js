"use strict";

var createProject = document.getElementById('new-project-btn');
var projectList = document.getElementById('project-list');
var currentProject = document.getElementById('current-project-tasks');
var projectTitle = document.getElementById('current-project-title');
var projects = JSON.parse(localStorage.getItem('projects')) || [];
var savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
createProject.addEventListener('click', function () {
  createNewProject();
});

var projectFactory = function projectFactory(title) {
  var todos = [];
  return {
    title: title,
    todos: todos
  };
};

var createNewProject = function createNewProject() {
  console.log(projects);
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

var appendToSidebarList = function appendToSidebarList(project) {
  var node = document.createElement('div');
  node.setAttribute('id', 'listNode');
  node.textContent = project.title;
  projectList.appendChild(node);
  node.addEventListener('click', function () {
    projectTitle.textContent = project.title;
    var todoList = document.createElement('div');
    createNewTask(project);
  });
};

projects.forEach(appendToSidebarList);

var manageTasks = function manageTasks(project) {
  while (currentProject.firstChild) {
    currentProject.removeChild(currentProject.firstChild);
  }

  project.todos.forEach(function (todo) {
    var div = document.createElement('div');
    div.textContent = todo;
    div.className = 'addedTask';
    currentProject.appendChild(div);
    savedTasks.push(todo);
    div.addEventListener('click', function () {
      console.log(todo);
    });
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
    localStorage.setItem('projects', JSON.stringify(projects));
  });
};

var taskFactory = function taskFactory(title, description, dueDate, priority) {
  return {
    title: title,
    description: description,
    dueDate: dueDate,
    priority: priority
  };
};

var createNewTask = function createNewTask(project) {
  manageTasks(project);
  var newTaskButton = document.createElement('button');
  newTaskButton.textContent = "New task";
  currentProject.appendChild(newTaskButton);
  newTaskButton.addEventListener('click', function () {
    var getTask = prompt("Task name?");
    var newTask = taskFactory(getTask);
    var taskDiv = document.createElement('div');
    var taskInfo = document.createElement('div');
    taskInfo.className = 'taskInfoBox';
    taskInfo.textContent = 'test';
    taskDiv.textContent = getTask;
    taskDiv.className = 'addedTask';
    taskDiv.appendChild(taskInfo);
    project.todos.push(getTask);
    taskDiv.addEventListener('click', function () {
      if (taskInfo.style.display == 'none') {
        taskInfo.setAttribute('style', 'display:block');
      } else {
        taskInfo.setAttribute('style', 'display:none');
      }
    });
    currentProject.appendChild(taskDiv);
  });
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
}; //todo: 1) edit project names, 2) add due dates and priorities, mark complete, delete