"use strict";

var _srccreateProject = require("srccreateProject.js");

var _srcindex = require("srcindex.js");

var _srcmanageTasks = require("srcmanageTasks.js");

(0, _srcindex.createNewTask)();
(0, _srccreateProject.createProject)();
(0, _srcmanageTasks.manageTasks)(); //todo:  2) change due date, priority, description and title
//known issues: mobile design needs improvement, refreshing page clears current project