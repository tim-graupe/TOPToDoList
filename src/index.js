const createProject = document.getElementById('new-project-btn');
const projectList = document.getElementById('project-list');
const currentProject = document.getElementById('current-project-tasks');
const projectTitle = document.getElementById('current-project-title')
const projects = JSON.parse(localStorage.getItem('projects')) || [];
let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

createProject.addEventListener('click', () => {
    createNewProject()
});



const projectFactory = (title) => {
    const todos = [];
    return {title, todos}
};



const createNewProject = () => {
    console.log(projects)
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
    const node = document.createElement('div');
    node.setAttribute('id', 'listNode')
    node.textContent = project.title;
    projectList.appendChild(node);
    node.addEventListener('click', () => {
        projectTitle.textContent = project.title;
        const todoList = document.createElement('div');
        createNewTask(project)
     }) 

}
projects.forEach(appendToSidebarList);



const manageTasks  = (project) => {

    while (currentProject.firstChild) {
        currentProject.removeChild(currentProject.firstChild)
    }
    project.todos.forEach(todo => {
        const div = document.createElement('div');
        div.textContent = todo;
        div.className = 'addedTask'
        currentProject.appendChild(div)
        savedTasks.push(todo)
        div.addEventListener('click', () => {
            console.log(todo)
        })
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
    localStorage.setItem('projects', JSON.stringify(projects))

    })

}

const taskFactory = (title, description, dueDate, priority) => {

    return {title, description, dueDate, priority}

}

const createNewTask = (project) => {
    manageTasks(project)
    const newTaskButton = document.createElement('button');
    newTaskButton.textContent = "New task"
    currentProject.appendChild(newTaskButton)
    newTaskButton.addEventListener('click', () => {
        const getTask = prompt("Task name?");
        const newTask = taskFactory(getTask);
        const taskDiv = document.createElement('div');
        const taskInfo = document.createElement('div');
        taskInfo.className = 'taskInfoBox';
        taskInfo.textContent = 'test'
        taskDiv.textContent = getTask;
        taskDiv.className = 'addedTask';
        taskDiv.appendChild(taskInfo)
        project.todos.push(getTask);
        taskDiv.addEventListener('click', () =>{
            if (taskInfo.style.display == 'none') { 
        taskInfo.setAttribute('style', 'display:block')
        } else {
            taskInfo.setAttribute('style', 'display:none')
        }
            
        })
        currentProject.appendChild(taskDiv);

        
    })
    localStorage.setItem("tasks", JSON.stringify(savedTasks));

}



//todo: 1) edit project names, 2) add due dates and priorities, mark complete, delete