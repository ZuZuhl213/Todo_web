import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../services/todo";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

export default function TodoPage() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await getTodos();
      setTodos(Array.isArray(data) ? data : []);
    } catch (error) {
      if (error?.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
        return;
      }
      console.error("Khong the tai danh sach todo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }
    loadTodos();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      setSaving(true);
      const created = await createTodo({ title: newTitle.trim() });
      setTodos((prev) => [created, ...prev]);
      setNewTitle("");
    } catch {
      alert("Tạo todo thất bại.");
    } finally {
      setSaving(false);
    }
  };

  const handleChangeStatus = async (todo, status) => {
    try {
      const updated = await updateTodo(todo.id, { title: todo.title, status });
      setTodos((prev) => prev.map((item) => (item.id === todo.id ? updated : item)));
    } catch {
      alert("Cập nhật trạng thái thất bại.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((item) => item.id !== id));
    } catch {
      alert("Xóa todo thất bại.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // ignore
    } finally {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <main className="todo-page">
      <section className="todo-shell">
        <header className="todo-header">
          <div>
            <h1 className="todo-title">Todo List</h1>
            <p className="todo-subtitle">Quản lý công việc mỗi ngày của bạn.</p>
          </div>
          <button className="btn btn-ghost" onClick={handleLogout}>
            Đăng xuất
          </button>
        </header>

        <form className="todo-create" onSubmit={handleCreate}>
          <input
            className="field-input"
            placeholder="Nhập công việc mới..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button className="btn btn-primary" type="submit" disabled={saving}>
            {saving ? "Đang thêm..." : "Thêm"}
          </button>
        </form>

        {loading ? <p className="todo-note">Đang tải...</p> : null}

        {!loading && todos.length === 0 ? (
          <div className="todo-empty">Chưa có todo nào.</div>
        ) : null}

        <div className="todo-list">
          {!loading &&
            todos.map((todo) => (
              <article className="todo-item" key={todo.id}>
                <p className="todo-item-title">{todo.title}</p>

                <div className="todo-item-actions">
                  <select
                    className={`status-select status-${todo.status || "pending"}`}
                    value={todo.status || "pending"}
                    onChange={(e) => handleChangeStatus(todo, e.target.value)}
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => handleDelete(todo.id)}
                  >
                    Xóa
                  </button>
                </div>
              </article>
            ))}
        </div>
      </section>
    </main>
  );
}
