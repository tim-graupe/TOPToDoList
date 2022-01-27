"use strict";

var _createProject = require("./createProject.js");

var _createTask = require("./createTask.js");

var _manageTasks = require("./manageTasks.js");

(0, _createTask.createNewTask)();
(0, _createProject.createProject)();
(0, _manageTasks.manageTasks)();
(0, _manageTasks.savedTasks)(); //todo:  2) change due date, priority, description and title
//known issues: mobile design needs improvement, refreshing page clears current project