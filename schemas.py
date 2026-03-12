from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class TodoBase(BaseModel):
    """Shared properties for Todo."""
    title: str
    description: Optional[str] = None
    completed: bool = False


class TodoCreate(TodoBase):
    """Schema for creating a new Todo."""
    pass


class TodoUpdate(BaseModel):
    """Schema for updating a Todo (all fields optional)."""
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None


class TodoResponse(TodoBase):
    """Schema for returning a Todo from the API."""
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True