// src/components/FixUsers.js

import React from "react";
import axios from "axios";

function FixUsers() {
  const runFixUsers = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/admin/fix-users");
      alert(res.data.message);
    } catch (error) {
      console.error("Fix Users Error:", error);
      alert("Something went wrong while fixing users.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin Panel</h2>
      <button className="btn btn-danger" onClick={runFixUsers}>
        Fix Sample Users
      </button>
    </div>
  );
}

export default FixUsers;

