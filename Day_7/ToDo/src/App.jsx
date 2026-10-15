
import { useState } from "react";
import "./App.css";

function App() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState("");
    const [filter, setFilter] = useState("All");
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    // 1. Add Task
    const handleSubmit = (e) => {
        e.preventDefault();

        const title = task.trim();
        if (!title) return;

        setTodos((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                title,
                completed: false,
            },
        ]);

        setTask("");
    };

    // Mark task as done or pending
    const toggleTodo = (id) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    };

    // 2. Delete Task
    const deleteTodo = (id) => {
        setTodos((prev) =>
            prev.filter((todo) => todo.id !== id)
        );

        if (editingId === id) {
            setEditingId(null);
            setEditText("");
        }
    };

    // 3. Edit Task
    const startEdit = (todo) => {
        setEditingId(todo.id);
        setEditText(todo.title);
    };

    const saveEdit = (id) => {
        const title = editText.trim();
        if (!title) return;

        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id
                    ? { ...todo, title }
                    : todo
            )
        );

        setEditingId(null);
        setEditText("");
    };

    // 4. Filter Tasks
    const filteredTodos = todos.filter((todo) => {
        if (filter === "Pending") return !todo.completed;
        if (filter === "Completed") return todo.completed;
        return true;
    });

    const total = todos.length;
    const completed = todos.filter((todo) => todo.completed).length;
    const pending = total - completed;

    return (
        <div className="app">
            <header className="header">
                <div className="logo">✓</div>
                <h2>TaskFlow</h2>
                <span className="header-label">MY TASK MANAGER</span>
            </header>

            <main className="container">
                <section className="welcome">
                    <div>
                        <h1>My Dashboard</h1>
                        <p>Organize your tasks and stay productive.</p>
                    </div>
                </section>

                {/* Statistics */}
                <section className="stats">
                    <div className="stat-card">
                        <span>Total Tasks</span>
                        <h2>{total}</h2>
                    </div>

                    <div className="stat-card pending-card">
                        <span>Pending Tasks</span>
                        <h2>{pending}</h2>
                    </div>

                    <div className="stat-card completed-card">
                        <span>Completed Tasks</span>
                        <h2>{completed}</h2>
                    </div>
                </section>

                {/* Add Task */}
                <section className="task-card">
                    <h2>My Tasks</h2>
                    <p className="subtitle">
                        Add, edit, complete or remove your tasks.
                    </p>

                    <form className="add-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Enter a new task..."
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            aria-label="New task"
                        />
                        <button type="submit" className="add-btn">
                            + Add Task
                        </button>
                    </form>

                    {/* Filter buttons */}
                    <div className="filters">
                        {["All", "Pending", "Completed"].map((item) => (
                            <button
                                type="button"
                                key={item}
                                className={
                                    filter === item
                                        ? "filter-btn active"
                                        : "filter-btn"
                                }
                                onClick={() => setFilter(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {/* Task list */}
                    <ul className="todo-list">
                        {filteredTodos.length === 0 ? (
                            <li className="empty">
                                {filter === "Completed"
                                    ? "No completed tasks yet. Tick a task when you finish it."
                                    : filter === "Pending"
                                      ? "No pending tasks."
                                      : "No tasks yet. Add your first task above."}
                            </li>
                        ) : (
                            filteredTodos.map((todo) => (
                                <li className="todo-item" key={todo.id}>
                                    <input
                                        className="todo-checkbox"
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => toggleTodo(todo.id)}
                                        aria-label="Mark task as done"
                                    />

                                    {editingId === todo.id ? (
                                        <form
                                            className="edit-form"
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                saveEdit(todo.id);
                                            }}
                                        >
                                            <input
                                                className="edit-input"
                                                value={editText}
                                                onChange={(e) =>
                                                    setEditText(e.target.value)
                                                }
                                                autoFocus
                                                aria-label="Edit task"
                                            />

                                            <button
                                                className="save-btn"
                                                type="submit"
                                            >
                                                Save
                                            </button>

                                            <button
                                                className="cancel-btn"
                                                type="button"
                                                onClick={() => {
                                                    setEditingId(null);
                                                    setEditText("");
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </form>
                                    ) : (
                                        <>
                                            <span
                                                className={
                                                    todo.completed
                                                        ? "todo-title done"
                                                        : "todo-title"
                                                }
                                            >
                                                {todo.title}
                                                <small>
                                                    {todo.completed
                                                        ? "Completed"
                                                        : "Pending"}
                                                </small>
                                            </span>

                                            <div className="actions">
                                                <button
                                                    type="button"
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        startEdit(todo)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        deleteTodo(todo.id)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))
                        )}
                    </ul>
                </section>

                <footer>TaskFlow · Stay organized, get things done.</footer>
            </main>
        </div>
    );
}

export default App;
