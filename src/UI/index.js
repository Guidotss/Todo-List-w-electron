const {Task} = require("../app.js")
const { remote } =  require("electron")

const task = new Task;

const addTodoDiv = document.getElementById("addTodo")
const todos = document.getElementById("todos");
const formTodo = document.getElementById("todoForm");
const inputTaskName = document.getElementById("taskName");
const inputDescription = document.getElementById("description");
const buttonDelete = document.getElementById("delete");
const editTodoDiv = document.getElementById("editTodo");
const editTodoForm = document.getElementById("todoEditForm");
const inputEditTaskName = document.getElementById("editTaskName");
const inputEditDescription = document.getElementById("editTaskDescription");

const openAddTodo = () => {
    addTodoDiv.classList.add("animate__animated", "animate__bounceInDown"); 
    setTimeout(() =>{
        addTodoDiv.style.display = "block";
    },300)
    addTodoDiv.classList.remove("animate__bounceOutUp");
}

const closeAddTodo = () => {
    addTodoDiv.classList.add("animate__animated", "animate__bounceOutUp");
    setTimeout(() => {
        addTodoDiv.style.display = "none"
    }, 700);
}

const closeEditTodo = () =>{
    editTodoDiv.classList.add("animate__animated", "animate__bounceOutUp");
    setTimeout(() => {
        editTodoDiv.style.display = "none"
    }, 700);
}


(async function(){
   const tasks = await task.getAll();
   renderAllTodos(tasks);
})()


const renderAllTodos = (tasks) =>{
    tasks.forEach(task =>{
        const {taskName,description,taskId} = task;
        return(
            todos.innerHTML+=`<div class="card">
                                    <div class="card-body">
                                        <h5 id="title" class="card-title">${taskName}</h5>
                                        <p id="description" class="card-text">${description}</p>
                                        <button class="btn btn-danger" id="delete" onClick="deleteTask(${taskId})">Delete</button>
                                        <button class="btn btn-primary" onClick="editTask(${taskId})">Edit</button>                                    
                                    </div>
                                </div>`
        )
    })
}

const renderNewTask = (task) =>{
    const {taskName,description,taskId} =  task; 
    return(
        todos.innerHTML+=`<div class="card">
                                <div class="card-body">
                                    <h5 id="title" class="card-title">${taskName}</h5>
                                    <p id="description" class="card-text">${description}</p>
                                    <button class="btn btn-danger" id="delete" onClick="deleteTask(${taskId})">Delete</button>
                                    <button class="btn btn-primary" onClick="editTask(${taskId})">Edit</button>                                   
                                </div>
                            </div>`
    )
}


formTodo.addEventListener("submit", async(e) => {
    e.preventDefault(); 
    const newTask = {
        taskId: Date.now(),
        taskName: inputTaskName.value,
        description: inputDescription.value
    }
    await task.createNewTask(newTask);
    formTodo.reset();
    formTodo.focus()
    closeAddTodo(); 
    renderNewTask(newTask);
})

const deleteTask = async(id) =>{
    const response = confirm("Esta seguro que quiere eliminar esta tarea?");
    
    if(response){
        await task.deleteTask(id);
        const tasks = await task.getAll();
        todos.innerHTML = "";
        renderAllTodos(tasks);
    }else{
        return;
    }
}

const editTask = async(id) =>{
    localStorage.setItem("id",id);

    editTodoDiv.classList.add("animate__animated", "animate__bounceInDown");
    setTimeout(() =>{
        editTodoDiv.style.display = "block";
        editTodoDiv.classList.remove("animate__bounceOutUp");
    } ,300)
}

editTodoForm.addEventListener("submit", async(e) => {

    e.preventDefault(); 

    const id = localStorage.getItem("id");
    const getTaskById = await task.getTaskById(id); 

    const newTask = {
        taskId: id,
        taskName: inputEditTaskName.value,
        description: inputEditDescription.value
    }

    await task.editTask(id,newTask);
    editTodoForm.reset();
    editTodoForm.focus()
    closeEditTodo();

    const tasks = await task.getAll();
    todos.innerHTML = "";

    renderAllTodos(tasks);
})