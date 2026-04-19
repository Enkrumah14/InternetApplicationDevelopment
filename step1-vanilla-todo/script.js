const apiURL = 'http://localhost:3000/todos';
const todoList = document.getElementById('todo-list');
const newTodoForm = document.getElementById('new-todo-form');
const newTodoInput = document.getElementById('new-todo-input');

async function fetchTodos() {
  const response = await fetch(apiURL);
  const todos = await response.json();

  todoList.innerHTML = '';
  todos.forEach((todo) => addTodoToDOM(todo));
}

function addTodoToDOM(todo) {
  const li = document.createElement('li');

  li.innerHTML = `
    <span class="todo-text ${todo.completed ? 'completed' : ''}">${todo.task}</span>
    <div class="todo-actions">
      <button class="small-btn" onclick="toggleComplete(${todo.id}, ${!todo.completed})">
        ${todo.completed ? 'Undo' : 'Done'}
      </button>
      <button class="small-btn" onclick="deleteTodo(${todo.id})">Delete</button>
    </div>
  `;

  todoList.appendChild(li);
}

newTodoForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const task = newTodoInput.value.trim();
  if (!task) return;

  await fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ task, completed: false })
  });

  newTodoInput.value = '';
  fetchTodos();
});

async function deleteTodo(id) {
  await fetch(`${apiURL}/${id}`, {
    method: 'DELETE'
  });

  fetchTodos();
}

async function toggleComplete(id, completed) {
  await fetch(`${apiURL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ completed })
  });

  fetchTodos();
}

fetchTodos();
