import { useState } from 'react';
import './TodoForm.css';

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title: title.trim(), description: description.trim() || null });
    setTitle('');
    setDescription('');
    setIsExpanded(false);
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-main">
        <input
          type="text"
          className="form-input title-input"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setIsExpanded(true)}
        />
        <button type="submit" className="btn-add" disabled={!title.trim()}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
      {isExpanded && (
        <textarea
          className="form-input desc-input"
          placeholder="Add a description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
      )}
    </form>
  );
}

export default TodoForm;
