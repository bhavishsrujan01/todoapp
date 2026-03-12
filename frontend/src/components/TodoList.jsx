import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList({ todos, onUpdate, onDelete, filter }) {
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  if (filteredTodos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          {filter === 'completed' ? '🎯' : filter === 'active' ? '🎉' : '📝'}
        </div>
        <p className="empty-text">
          {filter === 'completed'
            ? 'No completed todos yet'
            : filter === 'active'
            ? 'All caught up!'
            : 'Add your first todo above'}
        </p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TodoList;
