const addTodoDiv = document.getElementById("addTodo")

const openAddTodo = () => {
    addTodoDiv.style.display = "block"
    addTodoDiv.classList.add("animate__animated", "animate__fadeIn"); 
    addTodoDiv.classList.remove("animate__fadeOut");
}

const closeAddTodo = () => {
    addTodoDiv.classList.add("animate__animated", "animate__fadeOut");
}