import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000/api";

export default function TasksApp() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTasks() {
    try {
      setError("");
      setLoading(true);
      const res = await fetch(`${API_BASE}/tasks`);
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function addTask(e) {
    e.preventDefault();
    if (!title.trim()) return;

    const res = await fetch(`${API_BASE}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      const msg = await res.json().catch(() => ({}));
      alert(msg.message || "Failed to create task");
      return;
    }

    const created = await res.json();
    setTasks((prev) => [created, ...prev]); // update UI immediately
    setTitle("");
  }

  async function toggleDone(task) {
    const res = await fetch(`${API_BASE}/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !task.done }),
    });

    if (!res.ok) return alert("Failed to update");

    const updated = await res.json();
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }

  async function removeTask(id) {
    const res = await fetch(`${API_BASE}/tasks/${id}`, { method: "DELETE" });
    if (!res.ok && res.status !== 204) return alert("Failed to delete");
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div style={{ maxWidth: 520, margin: "40px auto", fontFamily: "system-ui" }}>
      <h2>Task 5 — API Integration</h2>

      <form onSubmit={addTask} style={{ display: "flex", gap: 8 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task title..."
          style={{ flex: 1, padding: 10 }}
        />
        <button type="submit" style={{ padding: "10px 14px" }}>
          Add
        </button>
      </form>

      <div style={{ marginTop: 16 }}>
        <button onClick={loadTasks} disabled={loading} style={{ padding: "8px 12px" }}>
          Refresh
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <ul style={{ paddingLeft: 18, marginTop: 14 }}>
        {tasks.map((t) => (
          <li key={t.id} style={{ marginBottom: 10 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input type="checkbox" checked={t.done} onChange={() => toggleDone(t)} />
              <span style={{ textDecoration: t.done ? "line-through" : "none" }}>
                {t.title}
              </span>
              <button
                onClick={() => removeTask(t.id)}
                style={{ marginLeft: "auto", padding: "6px 10px" }}
              >
                Delete
              </button>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}