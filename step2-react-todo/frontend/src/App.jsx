import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:5000/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setTodos(data);
  };

  const addTodo = async () => {
    const trimmedTask = task.trim();
    if (!trimmedTask) return;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: trimmedTask, completed: false })
    });

    const newTodo = await response.json();
    setTodos([...todos, newTodo]);
    setTask('');
  };

  const deleteTodo = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleCompleted = async (todo) => {
    const response = await fetch(`${API_URL}/${todo.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed })
    });

    const updatedTodo = await response.json();
    setTodos(todos.map((item) => (item.id === todo.id ? updatedTodo : item)));
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.task);
  };

  const saveEdit = async (id) => {
    const trimmedText = editingText.trim();
    if (!trimmedText) return;

    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: trimmedText })
    });

    const updatedTodo = await response.json();
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    setEditingId(null);
    setEditingText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h1 className="mb-2 text-center">Step 2 React Todo App</h1>
              <p className="text-muted text-center mb-4">
                This is the simplified React + Bootstrap version before the Amazon-style Step 3 build.
              </p>

              <div className="input-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter a task"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
                <button className="btn btn-primary" onClick={addTodo}>
                  Add Task
                </button>
              </div>

              <ul className="list-group">
                {todos.map((todo) => (
                  <li
                    key={todo.id}
                    className="list-group-item d-flex justify-content-between align-items-center gap-3"
                  >
                    <div className="flex-grow-1">
                      {editingId === todo.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                        />
                      ) : (
                        <span className={todo.completed ? 'text-decoration-line-through text-muted' : ''}>
                          {todo.task}
                        </span>
                      )}
                    </div>

                    <div className="d-flex gap-2 flex-wrap">
                      <button
                        className={`btn btn-sm ${todo.completed ? 'btn-outline-secondary' : 'btn-outline-success'}`}
                        onClick={() => toggleCompleted(todo)}
                      >
                        {todo.completed ? 'Undo' : 'Complete'}
                      </button>

                      {editingId === todo.id ? (
                        <>
                          <button className="btn btn-sm btn-warning" onClick={() => saveEdit(todo.id)}>
                            Save
                          </button>
                          <button className="btn btn-sm btn-secondary" onClick={cancelEdit}>
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button className="btn btn-sm btn-info text-white" onClick={() => startEdit(todo)}>
                          Edit
                        </button>
                      )}

                      <button className="btn btn-sm btn-danger" onClick={() => deleteTodo(todo.id)}>
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
