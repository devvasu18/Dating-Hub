// src/utils/auth.js
import { jwtDecode } from "jwt-decode";

export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // in seconds

    if (decoded.exp < currentTime) {
      // Token expired
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return false;
    }

    return true;
  } catch (err) {
    // If decoding fails, treat as invalid token
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return false;
  }
};
