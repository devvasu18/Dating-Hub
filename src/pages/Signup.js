import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", form);
    // Later: axios.post("/api/signup", form)
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Create Account</h2>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "400px" }}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input type="text" name="name" className="form-control" required value={form.name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" name="email" className="form-control" required value={form.email} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" name="password" className="form-control" required value={form.password} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
