import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#ff4d6d" }}>
      <Link className="navbar-brand fw-bold fs-4" to="/" >💘 DateHub</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/discover">Discover</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/match">Matches</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
          <li className="nav-item"><Link className="nav-link btn btn-primary text-white ms-2" to="/signup">Join Now</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
