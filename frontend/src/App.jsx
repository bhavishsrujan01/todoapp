import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { getTodos, createTodo, updateTodo, deleteTodo } from './api/todoApi';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await getTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to connect to the server. Is the backend running?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (todo) => {
    try {
      const newTodo = await createTodo(todo);
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      console.error('Failed to create todo:', err);
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      const updated = await updateTodo(id, updates);
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      console.error('Failed to update todo:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Failed to delete todo:', err);
    }
  };

  const counts = {
    all: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  return (
    <div className="app">
      <div className="app-bg" />
      <div className="container">
        <header className="app-header">
          <h1 className="app-title">
            <span className="title-icon">✦</span> Todo App
          </h1>
          <p className="app-subtitle">Organize your tasks beautifully</p>
        </header>

        <TodoForm onAdd={handleAdd} />

        <div className="filter-bar">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              <span className="filter-count">{counts[f]}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner" />
            <p>Loading todos...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p>⚠️ {error}</p>
            <button className="btn-retry" onClick={fetchTodos}>Retry</button>
          </div>
        ) : (
          <TodoList
            todos={todos}
            filter={filter}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

export default App;
