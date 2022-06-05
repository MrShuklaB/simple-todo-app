import axios from "axios";

export function getTodos() {
  return axios.get("/api/todos");
}

export function addTodo(newTodo: string) {
  return axios.post("/api/todos", { newTodo });
}

export function updateTodo({
  id,
  text,
  isDone,
}: {
  id: string;
  text: string;
  isDone: boolean;
}) {
  return axios.put(`/api/todos/${id}`, { text, isDone });
}

export function deleteTodo(id: string) {
  return axios.delete(`/api/todos/${id}`);
}
