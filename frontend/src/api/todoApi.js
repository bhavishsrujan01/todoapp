import axios from 'axios';

// In production (Vercel), frontend and backend share the same domain
// In development, we point to the local FastAPI server
const API_BASE_URL = import.meta.env.PROD ? '' : 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTodos = async () => {
  const response = await api.get('/api/todos/');
  return response.data;
};

export const createTodo = async (todo) => {
  const response = await api.post('/api/todos/', todo);
  return response.data;
};

export const updateTodo = async (id, todo) => {
  const response = await api.put(`/api/todos/${id}`, todo);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await api.delete(`/api/todos/${id}`);
  return response.data;
};
