import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // important for hamburger
import "../styles/Navbar.css";


function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loginStatus);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const activeStyle = {
    fontWeight: "bold",
    color: "#c90b2e",
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#fa4768fb" }}>
      <div className="container-fluid">
        {/* Logo */}
        <div className="d-flex align-items-center">
          <img
            src="/ChatGPT Image Jul 29, 2025, 01_50_54 pM.png"
            alt="DateHub"
            height="60"
            width={140}
          />
        </div>

        

        {/* Collapsible navigation */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav d-flex flex-row flex-wrap justify-content-end mb-0">
            {!isLoggedIn && (
  <li className="nav-item mx-2">
    <NavLink className="nav-link text-white" to="/" style={({ isActive }) => isActive ? activeStyle : undefined}>Home</NavLink>
  </li>
)}

            <li className="nav-item mx-2">
              <NavLink className="nav-link text-white" to="/discover" style={({ isActive }) => isActive ? activeStyle : undefined}>Discover</NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink className="nav-link text-white" to="/match" style={({ isActive }) => isActive ? activeStyle : undefined}>Liked</NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink className="nav-link text-white" to="/profile" style={({ isActive }) => isActive ? activeStyle : undefined}>Profile</NavLink>
            </li>

            {!isLoggedIn ? (
              <>
                <li className="nav-item mx-2">
                  <NavLink className="nav-link text-white" to="/login" style={({ isActive }) => isActive ? activeStyle : undefined}>Login</NavLink>
                </li>
                <li className="nav-item mx-2">
                  <NavLink className="nav-link btn btn-light text-danger fw-bold px-3 py-1" to="/signup" style={({ isActive }) => isActive ? activeStyle : undefined}>
                    Join Now
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item mx-2">
                <button className="btn btn-outline-light fw-bold" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
        {/* Hamburger button */}
        <button
          className="navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
