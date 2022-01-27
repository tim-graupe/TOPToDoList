import {projects, currentProject} from './createProject.js'
let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

const manageTasks  = (project) => {
    JSON.stringify(projects)

    while (currentProject.firstChild) {
        currentProject.removeChild(currentProject.firstChild)
    }
    //add displaying descriptions here? (below?)
    project.todos.forEach(todo => {
        const li = document.createElement('li');
        const deleteBtn = document.createElement('div');
        deleteBtn.setAttribute('class', 'material-icons');
        deleteBtn.textContent = 'delete';

        const editBtn = document.createElement('div');
        editBtn.setAttribute('class', 'material-icons');
        editBtn.textContent = 'edit';

        const setPriority = document.createElement('div');
        setPriority.setAttribute('class', 'material-icons');
        setPriority.textContent = 'priority_high';

        const completeTask = document.createElement('div');
        completeTask.setAttribute('class', 'material-icons');
        completeTask.textContent = 'done_outline';

        const dueDate = document.createElement('date');
        dueDate.setAttribute('class', 'material-icons');
        dueDate.textContent = 'event'

        li.textContent = todo.title;
        li.className = 'addedTask';
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        li.appendChild(setPriority);
        li.appendChild(completeTask);
        li.appendChild(dueDate);


        currentProject.appendChild(li);
        
        savedTasks.push(todo);
        deleteBtn.addEventListener('click', () => {
            for(var i = project.todos.length - 1; i >= 0; i--) {
                if(project.todos[i].title === todo.title) {
                   project.todos.splice(i, 1);
                   currentProject.removeChild(li);
                   localStorage.setItem("tasks", JSON.stringify(savedTasks));
                   localStorage.setItem('projects', JSON.stringify(projects));

                };
            };

        });

        editBtn.addEventListener('click', () => {
            todo.title = prompt('Change name')
            if (todo.title.length > 0) {
            li.textContent = todo.title;
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            localStorage.setItem("tasks", JSON.stringify(savedTasks));
            localStorage.setItem('projects', JSON.stringify(projects));

            } else if (todo.title == null) {
                return
            }
        })

        setPriority.addEventListener('click', () => {
            if (setPriority.style.color == 'red') {
                setPriority.style.color = 'yellow';
                todo.priority = 'Medium';
                localStorage.setItem("tasks", JSON.stringify(savedTasks));
                localStorage.setItem('projects', JSON.stringify(projects));
            } else if (setPriority.style.color == 'yellow') {
                setPriority.style.color = 'green'
                todo.priority = 'Low';
                localStorage.setItem("tasks", JSON.stringify(savedTasks));
                localStorage.setItem('projects', JSON.stringify(projects));
            } else {
                setPriority.style.color = 'red';
                todo.priority = 'High';
                localStorage.setItem("tasks", JSON.stringify(savedTasks));
                localStorage.setItem('projects', JSON.stringify(projects));
            }
        })

        completeTask.addEventListener('click', () => {
            if (li.style.textDecoration == 'none') {
                li.style.textDecoration = 'line-through';
                localStorage.setItem("tasks", JSON.stringify(savedTasks));
                localStorage.setItem('projects', JSON.stringify(projects));
            } else {
                li.style.textDecoration = 'none';
                localStorage.setItem("tasks", JSON.stringify(savedTasks));
                localStorage.setItem('projects', JSON.stringify(projects));
            }
        })

        dueDate.addEventListener('click', () => {
            let date = new Date()
            console.log(date)
        })
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
    localStorage.setItem('projects', JSON.stringify(projects));

    })

}

export {manageTasks, savedTasks}