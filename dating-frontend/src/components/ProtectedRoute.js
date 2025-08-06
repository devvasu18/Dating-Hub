import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isLoggedIn } from "../utils/auth"; // ✅ import helper

function ProtectedRoute({ children }) {
  const location = useLocation();

  if (!isLoggedIn()) {
    return (
      <Navigate
        to="/login"
        state={{ from: location, error: "Please login first." }}
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;
