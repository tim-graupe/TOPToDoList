import {manageTasks, savedTasks} from './manageTasks.js'

function Task(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
}

const createNewTask = (project) => {
    manageTasks(project);
    const newTaskInput = document.createElement('input');
    const newTaskBtn = document.createElement('button');
    newTaskInput.setAttribute('class', 'input-section');
    newTaskBtn.setAttribute('class', 'input-section');
    newTaskBtn.textContent = "Send";

    projectTitle.appendChild(newTaskBtn);
    projectTitle.appendChild(newTaskInput);
 


    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === "Enter"){
        e.preventDefault()
        const getTask = newTaskInput.value;
        const newTask = new Task(getTask, "Add Description", "Change Due Date", "Set Priority");
        project.todos.push(newTask);
        manageTasks(project)
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
        newTaskInput.value = '';

    }})
    newTaskBtn.addEventListener('click', (e) => {
        e.preventDefault()
        const getTaskName = newTaskInput.value;
        const newTask = new Task(getTaskName, "Add Description", "Change Due Date", "Set Priority");
        project.todos.push(newTask);
        manageTasks(project)
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
        newTaskInput.value = '';
    })
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

export {Task, createNewTask}