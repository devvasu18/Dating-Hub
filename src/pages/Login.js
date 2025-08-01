import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";
function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.email === "test@gmail.com" && form.password === "123456") {
      localStorage.setItem("isLoggedIn", "true");
      setError("");
      navigate("/discover");
    } else {
      setError("❌ Invalid email or password.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login to DateHub</h2>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "400px" }}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            required
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-control"
              required
              value={form.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button
          type="submit"
          className="btn btn-success w-100"
          style={{ backgroundColor: "#ff1540ff", borderColor: "#ff69b4" }}
        >
          Login
        </button>

        <div className="text-center mt-3">
          <span>Don't have an account? </span>
          <Link to="/signup" className="text-decoration-none text-danger fw-semibold">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
