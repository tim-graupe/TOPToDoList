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
    //add displaying descriptions here? (below?)
    project.todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo;
        li.className = 'addedTask'
        currentProject.appendChild(li)
        savedTasks.push(todo)
        li.addEventListener('click', () => {
            console.log(todo)
        })
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
    localStorage.setItem('projects', JSON.stringify(projects))

    })

}

function Task(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;    
}

const createNewTask = (project) => {
    let runTask = true;
    manageTasks(project)
    const newTaskInput = document.createElement('input');
    newTaskInput.setAttribute('id', 'inputField')
    currentProject.appendChild(newTaskInput)

    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === "Enter"){
        const getTask = newTaskInput.value;
        const newTask = new Task(getTask, "Add Description", "Change Due Date", 'Set Priority');
        project.todos.push(newTask.title);
        manageTasks(project)
        console.log(project.todos);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
        // getTask.addEventListener('click', () =>{
        //     if (taskInfo.style.display == 'none') { 
        //         taskInfo.setAttribute('style', 'display:block')
        //         } else {
        //             taskInfo.setAttribute('style', 'display:none')
        //         }
                    
        //         })
        // currentProject.appendChild(getTask);
        newTaskInput.value = '';
        createNewTask(project);

        return
    }})
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
}



//todo: 1) edit project names, 2) add due dates and priorities, mark complete, delete
//known issues: new tasks on pre-existing lists added below input box, mobile design needs improvement