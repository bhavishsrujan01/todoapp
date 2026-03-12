import { useState } from 'react';
import './TodoItem.css';

function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDesc, setEditDesc] = useState(todo.description || '');

  const handleToggle = () => {
    onUpdate(todo.id, { completed: !todo.completed });
  };

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onUpdate(todo.id, {
      title: editTitle.trim(),
      description: editDesc.trim() || null,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDesc(todo.description || '');
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            className="edit-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <input
            type="text"
            className="edit-input edit-desc"
            placeholder="Description (optional)"
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="edit-actions">
            <button className="btn-save" onClick={handleSave}>Save</button>
            <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <button
            className={`checkbox ${todo.completed ? 'checked' : ''}`}
            onClick={handleToggle}
            aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
          >
            {todo.completed && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>
          <div className="todo-content" onClick={() => setIsEditing(true)}>
            <span className="todo-title">{todo.title}</span>
            {todo.description && (
              <span className="todo-desc">{todo.description}</span>
            )}
          </div>
          <button
            className="btn-delete"
            onClick={() => onDelete(todo.id)}
            aria-label="Delete todo"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}

export default TodoItem;
