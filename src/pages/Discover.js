import React, { useState, useEffect } from "react";

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
    image: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    id: 3,
    name: "Simran Kaur",
    age: 23,
    bio: "Dancer, dreamer, foodie 💃",
    image: "https://randomuser.me/api/portraits/women/11.jpg",
  },
  {
    id: 4,
    name: "Riya Verma",
    age: 25,
    bio: "Adventurer and animal lover 🐾",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    id: 5,
    name: "Aman Joshi",
    age: 26,
    bio: "Cricket fan and coder 🏏",
    image: "https://randomuser.me/api/portraits/men/13.jpg",
  },
  {
    id: 6,
    name: "Anjali Gupta",
    age: 22,
    bio: "Gym freak & dog mom 💪🐶",
    image: "https://randomuser.me/api/portraits/women/14.jpg",
  },
  {
    id: 7,
    name: "Saurabh Singh",
    age: 28,
    bio: "Photographer, traveler, dreamer 📸",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
  },
  {
    id: 8,
    name: "Neha Dubey",
    age: 24,
    bio: "Spiritual & nature lover 🌿",
    image: "https://randomuser.me/api/portraits/women/16.jpg",
  },
  {
    id: 9,
    name: "Rohit Verma",
    age: 29,
    bio: "Fitness, tech, and mountain views 🏔️",
    image: "https://randomuser.me/api/portraits/men/17.jpg",
  },
  {
    id: 10,
    name: "Kajal Thakur",
    age: 23,
    bio: "Bollywood fan and coffee addict ☕",
    image: "https://randomuser.me/api/portraits/women/18.jpg",
  },
  {
    id: 11,
    name: "Manish Rawat",
    age: 26,
    bio: "Night owl and chess enthusiast ♟️",
    image: "https://randomuser.me/api/portraits/men/19.jpg",
  },
  {
    id: 12,
    name: "Tanvi Bhatia",
    age: 21,
    bio: "Foodie & solo traveler 🍜✈️",
    image: "https://randomuser.me/api/portraits/women/20.jpg",
  },
  {
    id: 13,
    name: "Abhishek Jha",
    age: 27,
    bio: "Runner, dreamer, doer 🏃‍♂️",
    image: "https://randomuser.me/api/portraits/men/21.jpg",
  },
  {
    id: 14,
    name: "Sneha Kapoor",
    age: 22,
    bio: "Minimalist & music lover 🎧",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    id: 15,
    name: "Vikram Desai",
    age: 28,
    bio: "Tea > Coffee ☕ | Coding addict",
    image: "https://randomuser.me/api/portraits/men/23.jpg",
  },
  {
    id: 16,
    name: "Megha Rathi",
    age: 24,
    bio: "Dreaming of mountains and books 📚",
    image: "https://randomuser.me/api/portraits/women/24.jpg",
  },
  {
    id: 17,
    name: "Aakash Tyagi",
    age: 26,
    bio: "Sunsets, sarcasm, and stargazing 🌌",
    image: "https://randomuser.me/api/portraits/men/25.jpg",
  },
  {
    id: 18,
    name: "Ishita Jain",
    age: 23,
    bio: "Plant mom 🌿 | Netflix & chill",
    image: "https://randomuser.me/api/portraits/women/26.jpg",
  },
  {
    id: 19,
    name: "Rajat Kapoor",
    age: 27,
    bio: "Startups and sneakers 👟💡",
    image: "https://randomuser.me/api/portraits/men/27.jpg",
  },
  {
    id: 20,
    name: "Pooja Sinha",
    age: 25,
    bio: "Writer. Reader. Overthinker. ✍️",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
  },
  {
    id: 21,
    name: "Yash Mittal",
    age: 24,
    bio: "Gamer, Guitarist & Golgappa lover 🎮🎸",
    image: "https://randomuser.me/api/portraits/men/29.jpg",
  },
  {
    id: 22,
    name: "Divya Nair",
    age: 26,
    bio: "Ocean vibes & open mics 🌊🎤",
    image: "https://randomuser.me/api/portraits/women/30.jpg",
  },
  {
    id: 23,
    name: "Nikhil Sharma",
    age: 28,
    bio: "Peace, poetry, and politics 📖🕊️",
    image: "https://randomuser.me/api/portraits/men/31.jpg",
  },
  {
    id: 24,
    name: "Aarohi Mishra",
    age: 22,
    bio: "Desi girl with a global soul 🌍✨",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    id: 25,
    name: "Karan Bansal",
    age: 25,
    bio: "Marketing guy with meme dreams 😎",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
  },
];


function Discover() {
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [users, setUsers] = useState(sampleUsers);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [batchSize, setBatchSize] = useState(6);

  useEffect(() => {
    // Determine screen size and set batch
    const handleResize = () => {
      const width = window.innerWidth;
      setBatchSize(width < 768 ? 4 : 6);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setDisplayedUsers(users.slice(0, batchSize));
  }, [users, batchSize]);

  const showActionToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleLike = (userName) => {
  const likedUser = users.find((u) => u.name === userName);
  if (!likedUser) return;

  const storedLikes = JSON.parse(localStorage.getItem("likedUsers")) || [];
  const isAlreadyLiked = storedLikes.some((u) => u.name === likedUser.name);
  if (!isAlreadyLiked) {
    storedLikes.push(likedUser);
    localStorage.setItem("likedUsers", JSON.stringify(storedLikes));
  }

  // ✅ remove from Discover after Like (but don't show Pass message)
  const updatedUsers = users.filter((user) => user.name !== userName);
  setUsers(updatedUsers);

  showActionToast(`❤️ You liked ${userName}`);
};


  const handlePass = (userName) => {
    const updatedUsers = users.filter((user) => user.name !== userName);
    setUsers(updatedUsers);
    showActionToast(`❌ You passed on ${userName}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Discover New People</h2>
      <div className="row justify-content-center">
        {displayedUsers.map((user) => (
          <motion.div
            key={user.id}
            className="col-md-4 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
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