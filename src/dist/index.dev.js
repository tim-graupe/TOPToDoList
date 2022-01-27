"use strict";

var _srccreateProject = require("srccreateProject.js");

var _srccreateTask = require("srccreateTask.js");

var _srcmanageTasks = require("srcmanageTasks.js");

(0, _srccreateProject.createNewProject)();
(0, _srccreateTask.createNewTask)();
createProject();
(0, _srcmanageTasks.manageTasks)(); //todo:  2) change due date, priority, description and title
//known issues: mobile design needs improvement, refreshing page clears current project