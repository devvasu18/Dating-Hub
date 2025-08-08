import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Discover from "./pages/Discover";
import Profile from "./pages/Profile";
import Match from "./pages/Match";
import UserProfile from "./pages/UserProfile";
import ChatPage from "./pages/ChatPage";
import EditProfile from "./pages/EditProfile";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import PopupModal from "./components/PopupModal";
import FixUsers from "./components/FixUsers";
// ✅ New Imports
import socket from "./socket"; // path to your socket.js file
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; // Don't forget this

function App() {
  // ✅ Use useEffect inside the component
  useEffect(() => {
    socket.on("match-notify", (data) => {
      toast.success(data.message);
    });

    return () => socket.off("match-notify");
  }, []);

  return (
    <div>
      <PopupModal />
    <div className="app-wrapper">
      <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/profile" element={
              <ProtectedRoute><Profile /></ProtectedRoute>
            } />
            <Route path="/match" element={
              <ProtectedRoute><Match /></ProtectedRoute>
            } />
           <Route path="/chat/:receiverId" element={<ChatPage />} />

            <Route path="/profile/:id" element={
              <ProtectedRoute><UserProfile /></ProtectedRoute>
            } />
            <Route path="/edit-profile" element={
              <ProtectedRoute><EditProfile /></ProtectedRoute>
            } />
            <Route path="/fixuser" element={<FixUsers />} />

          </Routes>
          
        </div>
        <Footer />
      </Router>
    </div>
    </div>
  );
  
}

export default App;
