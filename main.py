from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, get_db
from models import Base
from schemas import TodoCreate, TodoUpdate, TodoResponse
import crud

# Create database tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Todo App", description="A simple CRUD Todo API", version="1.0.0")

# Allow React dev server to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/todos/", response_model=TodoResponse, status_code=201)
def create_todo(todo: TodoCreate, db: Session = Depends(get_db)):
    """Create a new todo item."""
    return crud.create_todo(db=db, todo=todo)


@app.get("/todos/", response_model=list[TodoResponse])
def read_todos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all todo items."""
    return crud.get_todos(db=db, skip=skip, limit=limit)


@app.get("/todos/{todo_id}", response_model=TodoResponse)
def read_todo(todo_id: int, db: Session = Depends(get_db)):
    """Get a single todo item by ID."""
    db_todo = crud.get_todo(db=db, todo_id=todo_id)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return db_todo


@app.put("/todos/{todo_id}", response_model=TodoResponse)
def update_todo(todo_id: int, todo: TodoUpdate, db: Session = Depends(get_db)):
    """Update an existing todo item."""
    db_todo = crud.update_todo(db=db, todo_id=todo_id, todo=todo)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return db_todo


@app.delete("/todos/{todo_id}", response_model=TodoResponse)
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    """Delete a todo item."""
    db_todo = crud.delete_todo(db=db, todo_id=todo_id)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return db_todo
