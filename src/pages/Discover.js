import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toast, ToastContainer } from 'react-bootstrap';
import { motion } from "framer-motion";
import UserCard from "../components/UserCard";

const sampleUsers = [
  {
    id: 1,
    name: "Priya Sharma",
    age: 24,
    bio: "Love books, chai, and long walks ❤️",
    image: "https://i.pinimg.com/736x/d2/38/de/d238deeadabed399debaed1a2aa1a650.jpg",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    age: 27,
    bio: "Software engineer who loves music & memes 🎶",
    image: "https://previews.123rf.com/images/realityimages/realityimages1803/realityimages180300947/97894651-indian-boy-with-hand-on-chin-pune-at-maharashtra.jpg",
  },
  {
    id: 3,
    name: "Simran Kaur",
    age: 23,
    bio: "Dancer, dreamer, foodie 💃",
    image: "https://photosmint.com/wp-content/uploads/2025/03/Indian-Beauty-DP.jpeg",
  },
];

function Discover() {
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const showActionToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleLike = (userName) => {
    const likedUser = sampleUsers.find((u) => u.name === userName);
    if (!likedUser) return;

    // Get current liked users from localStorage
    const storedLikes = JSON.parse(localStorage.getItem("likedUsers")) || [];

    // Avoid duplicates
    const isAlreadyLiked = storedLikes.some((u) => u.name === likedUser.name);
    if (!isAlreadyLiked) {
      storedLikes.push(likedUser);
      localStorage.setItem("likedUsers", JSON.stringify(storedLikes));
    }

    showActionToast(`❤️ You liked ${userName}`);
  };

  const handlePass = (userName) => {
    showActionToast(`❌ You passed on ${userName}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Discover New People</h2>
      <div className="row justify-content-center">
        {sampleUsers.map((user) => (
          <motion.div
            key={user.id}
            className="col-md-4 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: user.id * 0.1 }}
          >
            <UserCard user={user} onLike={handleLike} onPass={handlePass} />
          </motion.div>
        ))}
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
