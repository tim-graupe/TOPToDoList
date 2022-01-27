import {  createProject, currentProject, projects } from "src\createProject.js";
import { Task, createNewTask } from "src\index.js";
import { manageTasks, savedTasks } from "src\manageTasks.js";
createNewTask()
createProject()
manageTasks()
//todo:  2) change due date, priority, description and title
//known issues: mobile design needs improvement, refreshing page clears current project
