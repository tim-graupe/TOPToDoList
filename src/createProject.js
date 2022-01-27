import {Task, createNewTask} from './createTask.js';
import {manageTasks, savedTasks} from './manageTasks.js'

const createProject = document.getElementById('new-project-btn');
const projects = JSON.parse(localStorage.getItem('projects')) || [];
const projectList = document.getElementById('project-list');
const currentProject = document.getElementById('current-project-tasks');
const projectTitle = document.getElementById('current-project-title');
projectTitle.setAttribute('id', 'projectTitle');

createProject.addEventListener('click', () => {
    createNewProject();
});



const projectFactory = (title) => {
    const todos = [];
    return {title, todos}
}

const createNewProject = () => {
    const getTitle = prompt("Project name?");

    if (getTitle == "") {
        alert("Empty field!")
    } else if
        (projects.some(project => project.title == getTitle)){
            alert("Duplicate project name!")
        } else {
    const newProject = projectFactory(getTitle);
    projects.push(newProject)
    appendToSidebarList(newProject)
    localStorage.setItem('projects', JSON.stringify(projects))
}}


const appendToSidebarList = (project) => {
    const node = document.createElement('li');
    const editBtn = document.createElement('div');
    const deleteBtn = document.createElement('div');
    editBtn.setAttribute('class', 'material-icons')
    editBtn.textContent = 'edit'
    deleteBtn.textContent = 'delete';
    deleteBtn.setAttribute('class', 'material-icons')
    node.setAttribute('id', 'list-node');
    node.textContent = project.title;
    node.appendChild(editBtn);
    node.appendChild(deleteBtn);
    projectList.appendChild(node);
    node.addEventListener('click', () => {
        projectTitle.textContent = project.title;
        createNewTask(project)
     });
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation()

        project.title = prompt('Change name')
        if (project.title.length > 0) {
        node.textContent = project.title;
        node.appendChild(editBtn);
        node.appendChild(deleteBtn);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
        localStorage.setItem('projects', JSON.stringify(projects));

        } else if (project.title == null) {
            return
        }
    })

    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        let text = 'Are you sure you wish to delete your ' + project.title + ' project?'
        if (confirm(text) == true){
        for(var i = projects.length - 1; i >= 0; i--) {
            if(projects[i].title === project.title) {
               projects.splice(i, 1);
               projectList.removeChild(node)
               localStorage.setItem("tasks", JSON.stringify(savedTasks));
               localStorage.setItem('projects', JSON.stringify(projects));
            }
        }} else {
            return
        }

    })


}
projects.forEach(appendToSidebarList);

export { createProject, currentProject, projects, appendToSidebarList, projectFactory }