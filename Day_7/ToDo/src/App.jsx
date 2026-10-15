import { useState } from "react";
import "./App.css";

function App() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState("");
    const [filter, setFilter] = useState("All");
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    // Add new task
    const handleSubmit = (e) => {
        e.preventDefault();

        const title = task.trim();

        if (!title) return;

        const newTodo = {
            id: crypto.randomUUID(),
            title,
            completed: false,
        };

        setTodos((prev) => [...prev, newTodo]);
        setTask("");
    };

    // Mark task complete or incomplete
    const toggleTodo = (id) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id
                    ? {
                          ...todo,
                          completed: !todo.completed,
                      }
                    : todo
            )
        );
    };

    // Delete task
    const deleteTodo = (id) => {
        setTodos((prev) =>
            prev.filter((todo) => todo.id !== id)
        );
    };

    // Start editing task
    const startEdit = (todo) => {
        setEditingId(todo.id);
        setEditText(todo.title);
    };

    // Save edited task
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

    // Filter tasks
    const filteredTodos = todos.filter((todo) => {
        if (filter === "Completed") {
            return todo.completed;
        }

        if (filter === "Pending") {
            return !todo.completed;
        }

        return true;
    });

    return (
        <div className="App">
            <h1>Todo App</h1>

            {/* Add Task */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter a task..."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />

                <button type="submit">Add Task</button>
            </form>

            {/* Filter Tasks */}
            <div className="filters">
                <button onClick={() => setFilter("All")}>
                    All
                </button>

                <button onClick={() => setFilter("Pending")}>
                    Pending
                </button>

                <button onClick={() => setFilter("Completed")}>
                    Completed
                </button>
            </div>

            {/* Display Tasks */}
            <ul>
                {filteredTodos.map((todo) => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                        />

                        {editingId === todo.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) =>
                                        setEditText(e.target.value)
                                    }
                                />

                                <button
                                    onClick={() => saveEdit(todo.id)}
                                >
                                    Save
                                </button>

                                <button
                                    onClick={() => {
                                        setEditingId(null);
                                        setEditText("");
                                    }}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <span
                                    style={{
                                        textDecoration: todo.completed
                                            ? "line-through"
                                            : "none",
                                    }}
                                >
                                    {todo.title}
                                </span>

                                <button
                                    onClick={() => startEdit(todo)}
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => deleteTodo(todo.id)}
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>

            {/* Task Statistics */}
            <p>Total Tasks: {todos.length}</p>

            <p>
                Completed:{" "}
                {todos.filter((todo) => todo.completed).length}
            </p>

            <p>
                Pending:{" "}
                {todos.filter((todo) => !todo.completed).length}
            </p>
        </div>
    );
}

export default App;