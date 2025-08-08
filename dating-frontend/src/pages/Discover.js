import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toast, ToastContainer } from 'react-bootstrap';
import { motion } from "framer-motion";
import axios from "axios";

function Discover() {
  const navigate = useNavigate();
  const [toastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [users, setUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [batchSize, setBatchSize] = useState(6);

  // ✅ Setup guest ID if missing
  useEffect(() => {
    let guestId = localStorage.getItem("guestId");
    let guestName = localStorage.getItem("guestName");

    if (!guestId || !guestName) {
      const newGuest = {
        id: "guest_" + Date.now(),
        name: "Guest_" + Math.floor(Math.random() * 1000),
      };
      localStorage.setItem("guestId", newGuest.id);
      localStorage.setItem("guestName", newGuest.name);
    }
  }, []);

  // ✅ Fetch discover users
  useEffect(() => {
    axios.get("http://localhost:5000/api/users/discover")
      .then((res) => {
        const usersWithFallbacks = res.data.map((user) => ({
          ...user,
          _id: user._id || "user_" + Math.random().toString(36).substring(2, 10),
          images: user.images?.length ? user.images : ["https://img.freepik.com/premium-vector/social-media-logo_1305298-29989.jpg"],
        }));
        setUsers(usersWithFallbacks);
      })
      .catch((err) => {
        console.error("❌ Error fetching users:", err);
        setUsers([]);
      });
  }, []);

  // ✅ Handle batch size for responsive UI
  useEffect(() => {
    const handleResize = () => {
      setBatchSize(window.innerWidth < 768 ? 4 : 6);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Display users based on batch
  useEffect(() => {
    setDisplayedUsers(users.slice(0, batchSize));
  }, [users, batchSize]);

  // ✅ Navigate to chat
  const handleChat = (targetUser) => {
    navigate(`/chat/${targetUser._id}`, {
      state: { user: targetUser },
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Discover New People</h2>
      <div className="row justify-content-center">
        {displayedUsers.length === 0 ? (
          <p className="text-center">No users found.</p>
        ) : (
          displayedUsers.map((user) => (
            <motion.div
              key={user._id}
              className="col-md-4 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <UserCard
                user={user}
                onChat={() => handleChat(user)}
                onViewProfile={() => console.log("Viewing profile of", user.name)}
              />
            </motion.div>
          ))
        )}
      </div>

      <ToastContainer position="bottom-center" className="mb-4">
        <Toast bg="dark" show={showToast} onClose={() => setShowToast(false)} delay={2500} autohide>
          <Toast.Body className="text-white text-center">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default Discover;
