import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/auth";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await register(form);
      localStorage.setItem("token", data.token);
      navigate("/todos");
    } catch {
      alert("Đăng ký thất bại. Vui lòng kiểm tra lại dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1 className="auth-title">Đăng ký</h1>
        <p className="auth-subtitle">Tạo tài khoản để quản lý công việc.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="field-label" htmlFor="name">
            Tên
          </label>
          <input
            id="name"
            className="field-input"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nguyen Van A"
            required
          />

          <label className="field-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="field-input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="email@example.com"
            required
          />

          <label className="field-label" htmlFor="password">
            Mật khẩu
          </label>
          <input
            id="password"
            className="field-input"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Tối thiểu 8 ký tự"
            required
          />

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>

        <p className="auth-footer">
          Đã có tài khoản? <Link to="/">Đăng nhập</Link>
        </p>
      </section>
    </main>
  );
}
