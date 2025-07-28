import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#ff4d6d" }}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4 text-white" to="/">💘 DateHub</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav d-flex align-items-center flex-nowrap overflow-auto">
            <li className="nav-item mx-2">
              <Link className="nav-link text-white" to="/">Home</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link text-white" to="/discover">Discover</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link text-white" to="/match">Matches</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link text-white" to="/profile">Profile</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link text-white" to="/login">Login</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link btn btn-light text-danger fw-bold px-3 py-1" to="/signup">
                Join Now
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
