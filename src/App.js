import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Discover from "./pages/Discover";
import Profile from "./pages/Profile";
import Match from "./pages/Match";
import UserProfile from "./pages/UserProfile";
import Chat from "./pages/Chat";
import EditProfile from "./pages/EditProfile";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="app-wrapper">
      <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/match" element={<Match />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
