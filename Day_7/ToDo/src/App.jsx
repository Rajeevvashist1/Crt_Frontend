
import { useState } from "react";

function App() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState("");
    const [filter, setFilter] = useState("All");
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");
    const [search, setSearch] = useState("");

    // Add a new task
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
                createdAt: new Date(),
            },
        ]);

        setTask("");
    };

    // Complete or uncomplete a task
    const toggleTodo = (id) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    };

    // Delete a task
    const deleteTodo = (id) => {
        setTodos((prev) =>
            prev.filter((todo) => todo.id !== id)
        );

        if (editingId === id) {
            setEditingId(null);
            setEditText("");
        }
    };

    // Start editing
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
                todo.id === id ? { ...todo, title } : todo
            )
        );

        setEditingId(null);
        setEditText("");
    };

    // Cancel editing
    const cancelEdit = () => {
        setEditingId(null);
        setEditText("");
    };

    // Task statistics
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const pending = total - completed;
    const progress = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    // Filter and search
    const filteredTodos = todos.filter((todo) => {
        const matchesFilter =
            filter === "All" ||
            (filter === "Pending" && !todo.completed) ||
            (filter === "Completed" && todo.completed);

        const matchesSearch = todo.title
            .toLowerCase()
            .includes(search.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    const filters = [
        { name: "All", count: total },
        { name: "Pending", count: pending },
        { name: "Completed", count: completed },
    ];

    return (
        <div className="app-shell">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap');

                * {
                    box-sizing: border-box;
                }

                body {
                    margin: 0;
                    background: #f5f7fb;
                    font-family: 'DM Sans', sans-serif;
                    color: #192238;
                }

                button, input {
                    font: inherit;
                }

                button {
                    cursor: pointer;
                }

                .app-shell {
                    min-height: 100vh;
                    background: #f5f7fb;
                }

                .topbar {
                    height: 76px;
                    padding: 0 7%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: #fff;
                    border-bottom: 1px solid #e9edf5;
                }

                .brand {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-family: 'Manrope', sans-serif;
                    font-weight: 800;
                    font-size: 21px;
                    letter-spacing: -0.7px;
                }

                .brand-icon {
                    width: 42px;
                    height: 42px;
                    display: grid;
                    place-items: center;
                    border-radius: 13px;
                    background: #6256e8;
                    color: white;
                    font-size: 23px;
                    box-shadow: 0 5px 13px #6256e833;
                }

                .top-label {
                    color: #7d879c;
                    font-size: 13px;
                }

                .main {
                    width: min(1120px, 90%);
                    margin: 38px auto 60px;
                }

                .welcome {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 20px;
                    margin-bottom: 28px;
                }

                .welcome h1 {
                    margin: 0 0 8px;
                    font-family: 'Manrope', sans-serif;
                    font-size: clamp(26px, 4vw, 34px);
                    letter-spacing: -1.2px;
                    font-weight: 800;
                }

                .welcome p {
                    margin: 0;
                    color: #7c879b;
                    font-size: 14px;
                    line-height: 1.6;
                }

                .today {
                    background: #fff;
                    border: 1px solid #e8ebf3;
                    padding: 12px 16px;
                    border-radius: 13px;
                    color: #59657b;
                    font-size: 13px;
                    white-space: nowrap;
                }

                .stats {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 18px;
                    margin-bottom: 25px;
                }

                .stat-card {
                    background: white;
                    border: 1px solid #e9edf5;
                    border-radius: 19px;
                    padding: 22px;
                    min-width: 0;
                    transition: transform .2s, box-shadow .2s;
                }

                .stat-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 28px #2534580b;
                }

                .stat-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 10px;
                }

                .stat-label {
                    color: #7d879a;
                    font-size: 13px;
                    font-weight: 600;
                }

                .stat-icon {
                    width: 42px;
                    height: 42px;
                    border-radius: 13px;
                    display: grid;
                    place-items: center;
                    font-size: 20px;
                }

                .purple { background: #efedff; color: #6558e8; }
                .orange { background: #fff2df; color: #e79b34; }
                .green { background: #e4f8ee; color: #22a568; }

                .stat-number {
                    font-family: 'Manrope', sans-serif;
                    font-size: 34px;
                    font-weight: 800;
                    letter-spacing: -1px;
                    margin-top: 13px;
                }

                .stat-foot {
                    color: #929bad;
                    font-size: 12px;
                    margin-top: 4px;
                }

                .progress-card {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 25px;
                    background: linear-gradient(110deg, #6558e8, #8275f2);
                    color: white;
                    border-radius: 19px;
                    padding: 23px 26px;
                    margin-bottom: 28px;
                    box-shadow: 0 8px 22px #6558e826;
                }

                .progress-card h3 {
                    font-size: 17px;
                    margin: 0 0 7px;
                }

                .progress-card p {
                    margin: 0;
                    font-size: 13px;
                    opacity: .85;
                }

                .progress-right {
                    min-width: 180px;
                    width: 36%;
                }

                .progress-percent {
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                    margin-bottom: 9px;
                }

                .progress-track {
                    height: 8px;
                    background: #ffffff40;
                    border-radius: 20px;
                    overflow: hidden;
                }

                .progress-fill {
                    height: 100%;
                    background: white;
                    border-radius: 20px;
                    transition: width .3s;
                }

                .content-card {
                    background: white;
                    border: 1px solid #e9edf5;
                    border-radius: 20px;
                    padding: 26px;
                    box-shadow: 0 4px 20px #25345805;
                }

                .section-heading {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;
                    margin-bottom: 22px;
                }

                .section-heading h2 {
                    margin: 0 0 6px;
                    font-family: 'Manrope', sans-serif;
                    font-size: 21px;
                    letter-spacing: -.5px;
                }

                .section-heading p {
                    margin: 0;
                    color: #8791a5;
                    font-size: 13px;
                }

                .task-count {
                    background: #f0efff;
                    color: #6558e8;
                    border-radius: 10px;
                    padding: 7px 11px;
                    font-size: 12px;
                    font-weight: 700;
                    white-space: nowrap;
                }

                .add-form {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 23px;
                }

                .input-wrap {
                    flex: 1;
                    min-width: 0;
                    position: relative;
                }

                .task-input {
                    width: 100%;
                    height: 49px;
                    padding: 0 15px;
                    border: 1px solid #e2e6ef;
                    background: #fafbfe;
                    border-radius: 12px;
                    outline: none;
                    color: #192238;
                    transition: border .2s, box-shadow .2s;
                }

                .task-input:focus {
                    border-color: #8175f0;
                    box-shadow: 0 0 0 3px #8175f01c;
                    background: white;
                }

                .primary-btn {
                    border: 0;
                    border-radius: 12px;
                    padding: 0 20px;
                    background: #6558e8;
                    color: white;
                    font-size: 13px;
                    font-weight: 700;
                    transition: background .2s, transform .2s;
                    white-space: nowrap;
                }

                .primary-btn:hover {
                    background: #5145d1;
                    transform: translateY(-1px);
                }

                .toolbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 14px;
                    margin-bottom: 18px;
                }

                .filter-list {
                    display: flex;
                    gap: 6px;
                    flex-wrap: wrap;
                }

                .filter-btn {
                    border: 1px solid transparent;
                    padding: 9px 13px;
                    border-radius: 10px;
                    background: transparent;
                    color: #7d879a;
                    font-size: 12px;
                    font-weight: 700;
                    transition: .2s;
                }

                .filter-btn:hover {
                    background: #f6f5ff;
                    color: #6558e8;
                }

                .filter-btn.active {
                    background: #efedff;
                    color: #6256e8;
                    border-color: #e6e2ff;
                }

                .filter-count {
                    margin-left: 5px;
                    opacity: .8;
                }

                .search-input {
                    width: 190px;
                    max-width: 40%;
                    height: 39px;
                    border: 1px solid #e5e9f1;
                    background: #fafbfe;
                    border-radius: 10px;
                    padding: 0 12px;
                    outline: none;
                    font-size: 12px;
                }

                .search-input:focus {
                    border-color: #8175f0;
                }

                .task-list {
                    display: grid;
                    gap: 10px;
                }

                .task-row {
                    display: flex;
                    align-items: center;
                    gap: 13px;
                    padding: 15px;
                    border: 1px solid #edf0f5;
                    border-radius: 13px;
                    transition: border .2s, background .2s;
                }

                .task-row:hover {
                    border-color: #dcd8ff;
                    background: #fdfcff;
                }

                .task-row.is-completed {
                    background: #fbfcfd;
                }

                .task-check {
                    width: 19px;
                    height: 19px;
                    flex-shrink: 0;
                    accent-color: #6558e8;
                    cursor: pointer;
                }

                .task-body {
                    flex: 1;
                    min-width: 0;
                }

                .task-title {
                    font-size: 14px;
                    font-weight: 600;
                    overflow-wrap: anywhere;
                    line-height: 1.5;
                }

                .task-title.done {
                    color: #a1a9b7;
                    text-decoration: line-through;
                }

                .task-meta {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-top: 7px;
                    font-size: 11px;
                    color: #99a2b2;
                }

                .status-pill {
                    padding: 4px 8px;
                    border-radius: 6px;
                    font-weight: 700;
                    font-size: 10px;
                }

                .status-pending {
                    background: #fff3df;
                    color: #cb8727;
                }

                .status-completed {
                    background: #e4f8ee;
                    color: #229963;
                }

                .task-actions {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }

                .action-btn {
                    height: 34px;
                    width: 36px;
                    border: 1px solid #e9edf5;
                    background: white;
                    border-radius: 9px;
                    color: #758097;
                    font-size: 15px;
                    transition: .2s;
                }

                .action-btn:hover {
                    background: #efedff;
                    color: #6256e8;
                    border-color: #e0dcff;
                }

                .action-btn.delete:hover {
                    background: #fff0f0;
                    color: #e25353;
                    border-color: #ffdada;
                }

                .edit-controls {
                    display: flex;
                    gap: 7px;
                    margin-top: 8px;
                }

                .edit-input {
                    min-width: 0;
                    width: 100%;
                    height: 38px;
                    border: 1px solid #cfc9ff;
                    border-radius: 9px;
                    padding: 0 10px;
                    outline: none;
                }

                .small-btn {
                    border: 0;
                    border-radius: 8px;
                    padding: 8px 11px;
                    font-size: 11px;
                    font-weight: 700;
                }

                .save-btn {
                    background: #6558e8;
                    color: white;
                }

                .cancel-btn {
                    background: #eef1f6;
                    color: #647087;
                }

                .empty-state {
                    padding: 43px 15px;
                    text-align: center;
                    border: 1px dashed #e1e5ef;
                    border-radius: 13px;
                }

                .empty-icon {
                    font-size: 35px;
                    margin-bottom: 12px;
                    color: #9a90f5;
                }

                .empty-state h3 {
                    margin: 0 0 7px;
                    font-size: 15px;
                }

                .empty-state p {
                    color: #8c96a8;
                    font-size: 12px;
                    margin: 0;
                }

                .footer {
                    text-align: center;
                    margin-top: 24px;
                    font-size: 12px;
                    color: #9ba4b4;
                }

                @media (max-width: 700px) {
                    .topbar {
                        padding: 0 5%;
                        height: 67px;
                    }

                    .top-label {
                        display: none;
                    }

                    .main {
                        width: 92%;
                        margin-top: 27px;
                    }

                    .welcome {
                        align-items: flex-start;
                    }

                    .today {
                        display: none;
                    }

                    .stats {
                        gap: 10px;
                    }

                    .stat-card {
                        padding: 14px;
                        border-radius: 14px;
                    }

                    .stat-icon {
                        width: 34px;
                        height: 34px;
                        font-size: 17px;
                        border-radius: 10px;
                    }

                    .stat-number {
                        font-size: 27px;
                    }

                    .stat-label {
                        font-size: 11px;
                    }

                    .stat-foot {
                        font-size: 10px;
                    }

                    .progress-card {
                        align-items: flex-start;
                        flex-direction: column;
                        gap: 18px;
                        padding: 21px;
                    }

                    .progress-right {
                        width: 100%;
                    }

                    .content-card {
                        padding: 17px;
                    }

                    .toolbar {
                        align-items: stretch;
                        flex-direction: column;
                    }

                    .search-input {
                        width: 100%;
                        max-width: none;
                    }

                    .task-row {
                        padding: 12px 10px;
                        gap: 9px;
                    }

                    .task-actions {
                        gap: 4px;
                    }

                    .action-btn {
                        width: 31px;
                        height: 32px;
                    }
                }

                @media (max-width: 400px) {
                    .stats {
                        grid-template-columns: 1fr;
                    }

                    .stat-card {
                        padding: 17px;
                    }

                    .stat-top {
                        justify-content: flex-start;
                    }

                    .stat-number {
                        margin-top: 8px;
                    }

                    .add-form {
                        flex-direction: column;
                    }

                    .primary-btn {
                        height: 45px;
                    }

                    .filter-btn {
                        padding: 8px 9px;
                    }

                    .task-meta {
                        flex-wrap: wrap;
                    }
                }
            `}</style>

            {/* Navigation */}
            <header className="topbar">
                <div className="brand">
                    <div className="brand-icon">✓</div>
                    <span>TaskFlow</span>
                </div>
                <div className="top-label">
                    YOUR PERSONAL PRODUCTIVITY SPACE
                </div>
            </header>

            <main className="main">
                {/* Welcome */}
                <section className="welcome">
                    <div>
                        <h1>My Dashboard</h1>
                        <p>
                            Stay organized, focus on your goals, and
                            get things done.
                        </p>
                    </div>
                    <div className="today">
                        {new Date().toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}
                    </div>
                </section>

                {/* Statistics */}
                <section className="stats">
                    <div className="stat-card">
                        <div className="stat-top">
                            <span className="stat-label">
                                Total Tasks
                            </span>
                            <div className="stat-icon purple">▤</div>
                        </div>
                        <div className="stat-number">{total}</div>
                        <div className="stat-foot">
                            All your tasks in one place
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-top">
                            <span className="stat-label">
                                Pending Tasks
                            </span>
                            <div className="stat-icon orange">◷</div>
                        </div>
                        <div className="stat-number">{pending}</div>
                        <div className="stat-foot">
                            Tasks waiting to be done
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-top">
                            <span className="stat-label">
                                Completed Tasks
                            </span>
                            <div className="stat-icon green">✓</div>
                        </div>
                        <div className="stat-number">{completed}</div>
                        <div className="stat-foot">
                            Tasks you have finished
                        </div>
                    </div>
                </section>

                {/* Progress */}
                <section className="progress-card">
                    <div>
                        <h3>Your productivity overview</h3>
                        <p>
                            {total === 0
                                ? "Add your first task to get started."
                                : pending === 0
                                  ? "Excellent! All your tasks are complete."
                                  : `${pending} task${pending === 1 ? "" : "s"} left to complete.`}
                        </p>
                    </div>

                    <div className="progress-right">
                        <div className="progress-percent">
                            <span>Completion progress</span>
                            <strong>{progress}%</strong>
                        </div>
                        <div className="progress-track">
                            <div
                                className="progress-fill"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </section>

                {/* Task Manager */}
                <section className="content-card">
                    <div className="section-heading">
                        <div>
                            <h2>My Tasks</h2>
                            <p>Create, manage, and track your daily tasks.</p>
                        </div>
                        <span className="task-count">
                            {total} {total === 1 ? "TASK" : "TASKS"}
                        </span>
                    </div>

                    {/* Add task */}
                    <form className="add-form" onSubmit={handleSubmit}>
                        <div className="input-wrap">
                            <input
                                className="task-input"
                                type="text"
                                placeholder="What needs to get done?"
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                                aria-label="New task title"
                            />
                        </div>
                        <button className="primary-btn" type="submit">
                            + Add Task
                        </button>
                    </form>

                    {/* Filters and search */}
                    <div className="toolbar">
                        <div className="filter-list">
                            {filters.map((item) => (
                                <button
                                    key={item.name}
                                    type="button"
                                    className={`filter-btn ${
                                        filter === item.name ? "active" : ""
                                    }`}
                                    onClick={() => setFilter(item.name)}
                                >
                                    {item.name}
                                    <span className="filter-count">
                                        {item.count}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <input
                            className="search-input"
                            type="search"
                            placeholder="Search tasks..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            aria-label="Search tasks"
                        />
                    </div>

                    {/* Task list */}
                    <div className="task-list">
                        {filteredTodos.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">☑</div>
                                <h3>
                                    {search
                                        ? "No matching tasks"
                                        : filter === "Completed"
                                          ? "No completed tasks yet"
                                          : filter === "Pending"
                                            ? "No pending tasks"
                                            : "Your task list is empty"}
                                </h3>
                                <p>
                                    {search
                                        ? "Try another search term."
                                        : filter === "All"
                                          ? "Add a task above to get started."
                                          : "Add a new task or choose another filter."}
                                </p>
                            </div>
                        ) : (
                            filteredTodos.map((todo) => (
                                <div
                                    className={`task-row ${
                                        todo.completed ? "is-completed" : ""
                                    }`}
                                    key={todo.id}
                                >
                                    <input
                                        className="task-check"
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => toggleTodo(todo.id)}
                                        aria-label={`Mark ${todo.title} as ${
                                            todo.completed
                                                ? "pending"
                                                : "completed"
                                        }`}
                                    />

                                    <div className="task-body">
                                        {editingId === todo.id ? (
                                            <form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    saveEdit(todo.id);
                                                }}
                                            >
                                                <input
                                                    className="edit-input"
                                                    value={editText}
                                                    onChange={(e) =>
                                                        setEditText(
                                                            e.target.value
                                                        )
                                                    }
                                                    autoFocus
                                                    aria-label="Edit task title"
                                                />
                                                <div className="edit-controls">
                                                    <button
                                                        type="submit"
                                                        className="small-btn save-btn"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="small-btn cancel-btn"
                                                        onClick={cancelEdit}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        ) : (
                                            <>
                                                <div
                                                    className={`task-title ${
                                                        todo.completed
                                                            ? "done"
                                                            : ""
                                                    }`}
                                                >
                                                    {todo.title}
                                                </div>
                                                <div className="task-meta">
                                                    <span>
                                                        Added{" "}
                                                        {todo.createdAt.toLocaleDateString(
                                                            "en-IN",
                                                            {
                                                                day: "numeric",
                                                                month: "short",
                                                            }
                                                        )}
                                                    </span>
                                                    <span
                                                        className={`status-pill ${
                                                            todo.completed
                                                                ? "status-completed"
                                                                : "status-pending"
                                                        }`}
                                                    >
                                                        {todo.completed
                                                            ? "Completed"
                                                            : "Pending"}
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {editingId !== todo.id && (
                                        <div className="task-actions">
                                            <button
                                                type="button"
                                                className="action-btn"
                                                onClick={() => startEdit(todo)}
                                                aria-label={`Edit ${todo.title}`}
                                                title="Edit task"
                                            >
                                                ✎
                                            </button>
                                            <button
                                                type="button"
                                                className="action-btn delete"
                                                onClick={() =>
                                                    deleteTodo(todo.id)
                                                }
                                                aria-label={`Delete ${todo.title}`}
                                                title="Delete task"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </section>

                <footer className="footer">
                    TaskFlow · Stay focused. Get things done.
                </footer>
            </main>
        </div>
    );
}

export default App;
