let todo1 = "Make a bed";
let todo2 = "Do groceries";
let todo3 = "Wash the car";


let todos;
const savedToDos = JSON.parse(localStorage.getItem('todos'));

if(Array.isArray(savedToDos)){
    todos = savedToDos;
}else{
    todos = [{ title:"Make a bed", dueDate: '2021-08-09', id: 'id1', isDone: false}, 
    { title:"Do groceries", dueDate: '2023-03-09', id: 'id2', isDone: true }, 
    {title: "Wash the car", dueDate: '2021-05-06', id: 'id3', isDone: false}];
}


render();
saveToDos();

function ToDo(){
    let textbox = document.getElementById('todo-title');
    let title = textbox.value

    let datePicker = document.getElementById('date-picker');
    const dueDate = datePicker.value;

    const isDone = false;

    const id = '' + new Date().getTime();
    todos.push({
        title: title,
        dueDate: dueDate,
        id: id,
        isDone: isDone
    });

    render();
}

function saveToDos(){
    localStorage.setItem('todos', JSON.stringify(todos))
}

function deleteTodo(event){
    const deleteButton = event.target;
    const idToDelete = deleteButton.id;

    todos  = todos.filter(function(todo){
        if(todo.id === idToDelete){
            return false
        }else{
            return true
        }
    })
    render()
    saveToDos()
}


function toggleTodo(todoId, checked) {
    todos.forEach(function (todo) {
      if (todo.id === todoId) {
        todo.isDone = checked;
      }
    });
  }

function changeTodo(event){
    const checkbox = event.target;

    const todoId = checkbox.dataset.todoId;
    const checked = checkbox.checked;

    toggleTodo(todoId, checked);
    render();

    
}

function render(){
    //reset our list
    document.getElementById('todo-list').innerHTML = '';

    todos.forEach(function (todo){
        let element = document.createElement('div');
        element.innerText = todo.title + ' '+ todo.dueDate;
        const checkButton = document.createElement('input');
        checkButton.type = 'checkbox';
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.style = 'margin-left: 12px; color: white; background-color:darkred; padding: 5px; border-radius:9px;';
        deleteButton.onclick = deleteTodo;
        checkButton.onchange = changeTodo;
        deleteButton.id = todo.id;
        checkButton.dataset.todoId = todo.id
        if (todo.isDone === true) {
            checkButton.checked = true;
          } else {
            checkButton.checked = false;
          }
        element.prepend(checkButton);
        element.appendChild(deleteButton)
        let todoList = document.getElementById('todo-list')
        todoList.appendChild(element);
    })
}


