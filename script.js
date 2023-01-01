// Global Variables
const form = document.getElementById('form');
const textInput = document.getElementById('text-input');
const datePicker = document.getElementById('date-picker');
const todoList = document.getElementById('todo-list');

// Execution

renderLocalStorage();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const todoTitle = textInput.value;
  const todoDate = datePicker.value;
  
  saveToLocalStorage(todoTitle, todoDate);
  renderLocalStorage();

  textInput.value = '';
  datePicker.value = '';
});

// Function declarations

function getLocalStorage() {
  const localTodo = JSON.parse(localStorage.getItem('localtodo'));
  return localTodo === null ? []: localTodo;
}

function saveToLocalStorage(title, date) {
  const localTodo = getLocalStorage();
  const newTodo = {};
  newTodo.title = title;
  newTodo.date = date;
  newTodo.id = new Date().getTime();
  localTodo.push(newTodo);
  localStorage.setItem('localtodo', JSON.stringify(localTodo));
}

function renderLocalStorage() {
  todoList.innerHTML = '';
  const localTodo = getLocalStorage();
  localTodo.forEach((todo) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${todo.title} ${todo.date}`;
    listItem.setAttribute('id', todo.id)
    listItem.addEventListener('dblclick', (e)=> {
      listItem.classList.toggle('completed');
      const targetId = parseInt(e.target.id);
      deleteFromLocalStorage(targetId);
    })
    todoList.appendChild(listItem);
  });
}

function deleteFromLocalStorage(listId) {
  const localTodo = getLocalStorage();
  for (let i = 0; i < localTodo.length; i++) {
    if (localTodo[i].id === listId) {
      localTodo.splice(i, 1);
    }
  }
  console.log(localTodo);
  localStorage.setItem('localtodo', JSON.stringify(localTodo));
}