import axios from "axios";

export function getTodos() {
  return axios.get("/api/todos");
}

export function addTodo(newTodo: string) {
  return axios.post("/api/todos", { newTodo });
}

export function updateTodo(id: string) {
  return axios.put(`/api/todos/${id}`);
}

export function deleteTodo(id: string) {
  return axios.delete(`/api/todos/${id}`);
}
