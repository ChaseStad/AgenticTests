const baseUrl = import.meta.env.VITE_API_URL || "/api";

export async function fetchTodos() {
  const response = await fetch(`${baseUrl}/todos/`);
  if (!response.ok) {
    throw new Error("Failed to load todos");
  }
  return response.json();
}

export async function createTodo(title) {
  const response = await fetch(`${baseUrl}/todos/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title })
  });
  if (!response.ok) {
    throw new Error("Failed to create todo");
  }
  return response.json();
}

export async function toggleTodo(todo) {
  const response = await fetch(`${baseUrl}/todos/${todo.id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ completed: !todo.completed })
  });
  if (!response.ok) {
    throw new Error("Failed to update todo");
  }
  return response.json();
}

export async function deleteTodo(id) {
  const response = await fetch(`${baseUrl}/todos/${id}/`, {
    method: "DELETE"
  });
  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
}
