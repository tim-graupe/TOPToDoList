"use strict";

var createProject = document.getElementById('new-project-btn');
var projectList = document.getElementById('project-list');
var currentProject = document.getElementById('current-project-tasks');
var projectTitle = document.getElementById('current-project-title');
projectTitle.setAttribute('id', 'projectTitle');
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
    createNewTask(project);
  });
  editBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    project.title = prompt('Change name');

    if (project.title.length > 0) {
      node.textContent = project.title;
      node.appendChild(editBtn);
      node.appendChild(deleteBtn);
      localStorage.setItem("tasks", JSON.stringify(savedTasks));
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
          localStorage.setItem("tasks", JSON.stringify(savedTasks));
          localStorage.setItem('projects', JSON.stringify(projects));
        }
      }
    } else {
      return;
    }
  });
};

projects.forEach(appendToSidebarList);

var manageTasks = function manageTasks(project) {
  JSON.stringify(projects);

  while (currentProject.firstChild) {
    currentProject.removeChild(currentProject.firstChild);
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
    currentProject.appendChild(li);
    savedTasks.push(todo);
    deleteBtn.addEventListener('click', function () {
      for (var i = project.todos.length - 1; i >= 0; i--) {
        if (project.todos[i].title === todo.title) {
          project.todos.splice(i, 1);
          currentProject.removeChild(li);
          localStorage.setItem("tasks", JSON.stringify(savedTasks));
          localStorage.setItem('projects', JSON.stringify(projects));
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
        localStorage.setItem('projects', JSON.stringify(projects));
      } else if (todo.title == null) {
        return;
      }
    });
    setPriority.addEventListener('click', function () {
      if (setPriority.style.color == 'red') {
        setPriority.style.color = 'yellow';
        todo.priority = 'Medium';
      } else if (setPriority.style.color == 'yellow') {
        setPriority.style.color = 'green';
        todo.priority = 'Low';
      } else {
        setPriority.style.color = 'red';
        todo.priority = 'High';
      }
    });
    completeTask.addEventListener('click', function () {
      if (li.style.textDecoration == 'none') {
        li.style.textDecoration = 'line-through';
      } else {
        li.style.textDecoration = 'none';
      }
    });
    dueDate.addEventListener('click', function () {
      var date = new date();
      console.log(date);
    });
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
    localStorage.setItem('projects', JSON.stringify(projects));
  });
};

function Task(title, description, dueDate, priority) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
}

var createNewTask = function createNewTask(project) {
  manageTasks(project);
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
      manageTasks(project);
      localStorage.setItem("tasks", JSON.stringify(savedTasks));
      newTaskInput.value = '';
    }
  });
  newTaskBtn.addEventListener('click', function (e) {
    e.preventDefault();
    var getTaskName = newTaskInput.value;
    var newTask = new Task(getTaskName, "Add Description", "Change Due Date", "Set Priority");
    project.todos.push(newTask);
    manageTasks(project);
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
    newTaskInput.value = '';
  });
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
}; //todo:  2) change due date, priority, description and title
//known issues: mobile design needs improvement, refreshing page clears current project