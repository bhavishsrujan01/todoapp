from sqlalchemy.orm import Session
from models import Todo
from schemas import TodoCreate, TodoUpdate


def create_todo(db: Session, todo: TodoCreate) -> Todo:
    """Create a new todo item."""
    db_todo = Todo(**todo.model_dump())
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo


def get_todo(db: Session, todo_id: int) -> Todo | None:
    """Get a single todo item by ID."""
    return db.query(Todo).filter(Todo.id == todo_id).first()


def get_todos(db: Session, skip: int = 0, limit: int = 100) -> list[Todo]:
    """Get all todo items with optional pagination."""
    return db.query(Todo).offset(skip).limit(limit).all()


def update_todo(db: Session, todo_id: int, todo: TodoUpdate) -> Todo | None:
    """Update an existing todo item (partial update)."""
    db_todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if db_todo is None:
        return None

    update_data = todo.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_todo, key, value)

    db.commit()
    db.refresh(db_todo)
    return db_todo


def delete_todo(db: Session, todo_id: int) -> Todo | None:
    """Delete a todo item by ID. Returns the deleted item, or None if not found."""
    db_todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if db_todo is None:
        return None

    db.delete(db_todo)
    db.commit()
    return db_todo