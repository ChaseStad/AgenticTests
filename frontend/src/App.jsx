import { useEffect, useState } from "react";

import { createTodo, deleteTodo, fetchTodos, toggleTodo } from "./api";

const emptyState = {
  items: [],
  isLoading: true,
  error: ""
};

function App() {
  const [state, setState] = useState(emptyState);
  const [title, setTitle] = useState("");

  useEffect(() => {
    let isMounted = true;
    fetchTodos()
      .then((items) => {
        if (isMounted) {
          setState({ items, isLoading: false, error: "" });
        }
      })
      .catch((error) => {
        if (isMounted) {
          setState({ items: [], isLoading: false, error: error.message });
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title.trim()) {
      return;
    }

    try {
      const newTodo = await createTodo(title.trim());
      setState((prev) => ({
        ...prev,
        items: [newTodo, ...prev.items]
      }));
      setTitle("");
    } catch (error) {
      setState((prev) => ({ ...prev, error: error.message }));
    }
  };

  const handleToggle = async (todo) => {
    try {
      const updated = await toggleTodo(todo);
      setState((prev) => ({
        ...prev,
        items: prev.items.map((item) => (item.id === updated.id ? updated : item))
      }));
    } catch (error) {
      setState((prev) => ({ ...prev, error: error.message }));
    }
  };

  const handleDelete = async (todoId) => {
    try {
      await deleteTodo(todoId);
      setState((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.id !== todoId)
      }));
    } catch (error) {
      setState((prev) => ({ ...prev, error: error.message }));
    }
  };

  return (
    <div className="page">
      <main className="card">
        <header className="card__header">
          <div>
            <p className="eyebrow">React + Django</p>
            <h1>To-do List</h1>
            <p className="subtitle">Track tasks, mark them complete, and keep moving.</p>
          </div>
        </header>

        <form className="todo-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Add a new task"
            aria-label="Add a new task"
          />
          <button type="submit">Add</button>
        </form>

        {state.error ? <p className="error">{state.error}</p> : null}

        {state.isLoading ? (
          <p className="loading">Loading tasks…</p>
        ) : state.items.length === 0 ? (
          <p className="empty">No tasks yet. Add your first one above.</p>
        ) : (
          <ul className="todo-list">
            {state.items.map((todo) => (
              <li key={todo.id} className={todo.completed ? "todo completed" : "todo"}>
                <button
                  className="todo__toggle"
                  type="button"
                  onClick={() => handleToggle(todo)}
                  aria-pressed={todo.completed}
                >
                  <span className="todo__title">{todo.title}</span>
                </button>
                <button
                  className="todo__delete"
                  type="button"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;
