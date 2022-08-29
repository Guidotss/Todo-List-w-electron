const {Task} = require("../app.js")
const { remote } =  require("electron")

const task = new Task;

const addTodoDiv = document.getElementById("addTodo")
const todos = document.getElementById("todos");
const formTodo = document.getElementById("todoForm");
const inputTaskName = document.getElementById("taskName");
const inputDescription = document.getElementById("description");

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
(async function(){
   const tasks = await task.getAll();
   renderAllTodos(tasks);
})()

const renderAllTodos = (tasks) =>{
    tasks.forEach(task =>{
        return(
            todos.innerHTML+=`<div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">${task.taskName}</h5>
                                        <p class="card-text">${task.description}</p>
                                        <button class="btn btn-danger" onclick="deleteTodo()">Delete</button>
                                        <button class="btn btn-primary" onclick="editTodo()">Edit</button>
                                        <button class="btn btn-success" onclick="completeTodo()">Complete</button>
                                        <button class="btn btn-warning" onclick="incompleteTodo()">Incomplete</button>                                        
                                    </div>
                                </div>`
        )
    })
}


formTodo.addEventListener("submit", async(e) => {
    e.preventDefault(); 
    const newTask = {
        taskName: inputTaskName.value,
        description: inputDescription.value
    }
})
