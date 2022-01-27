import {  createProject, currentProject, projects } from "./createProject.js";
import { Task, createNewTask } from "./createTask.js";
import { manageTasks, savedTasks } from "./manageTasks.js";
createNewTask()
createProject()
manageTasks()
savedTasks()
//todo:  2) change due date, priority, description and title
//known issues: mobile design needs improvement, refreshing page clears current project