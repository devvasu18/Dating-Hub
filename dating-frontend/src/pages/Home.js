import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const sampleUsers = [
  { id: 1, name: "Aanya", img: "https://randomuser.me/api/portraits/women/81.jpg" },
  { id: 2, name: "Diya", img: "https://randomuser.me/api/portraits/women/82.jpg" },
  { id: 3, name: "Tanya", img: "https://randomuser.me/api/portraits/women/83.jpg" },
  { id: 4, name: "Kavya", img: "https://randomuser.me/api/portraits/women/84.jpg" },
  { id: 5, name: "Meera", img: "https://randomuser.me/api/portraits/women/85.jpg" },
  { id: 6, name: "Saanvi", img: "https://randomuser.me/api/portraits/women/86.jpg" },
  { id: 7, name: "Ishita", img: "https://randomuser.me/api/portraits/women/87.jpg" },
  { id: 8, name: "Avni", img: "https://randomuser.me/api/portraits/women/88.jpg" },
  { id: 9, name: "Charvi", img: "https://randomuser.me/api/portraits/women/89.jpg" },
  { id: 10, name: "Riya", img: "https://randomuser.me/api/portraits/women/90.jpg" },
  { id: 11, name: "Neha", img: "https://randomuser.me/api/portraits/women/91.jpg" },
  { id: 12, name: "Anvi", img: "https://randomuser.me/api/portraits/women/92.jpg" },

  { id: 13, name: "Simran", img: "https://randomuser.me/api/portraits/women/41.jpg" },
  { id: 14, name: "Tanvi", img: "https://randomuser.me/api/portraits/women/42.jpg" },
  { id: 15, name: "Aaradhya", img: "https://randomuser.me/api/portraits/women/43.jpg" },
  { id: 16, name: "Muskan", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 17, name: "Khushi", img: "https://randomuser.me/api/portraits/women/45.jpg" },
  { id: 18, name: "Ira", img: "https://randomuser.me/api/portraits/women/46.jpg" },
  { id: 19, name: "Aisha", img: "https://randomuser.me/api/portraits/women/47.jpg" },
  { id: 20, name: "Zoya", img: "https://randomuser.me/api/portraits/women/48.jpg" },
  { id: 21, name: "Niharika", img: "https://randomuser.me/api/portraits/women/49.jpg" },
  { id: 22, name: "Lavanya", img: "https://randomuser.me/api/portraits/women/50.jpg" },
  { id: 23, name: "Kiara", img: "https://randomuser.me/api/portraits/women/60.jpg" },
  { id: 24, name: "Ritika", img: "https://randomuser.me/api/portraits/women/61.jpg" },

  { id: 25, name: "Arjun", img: "https://randomuser.me/api/portraits/men/81.jpg" },
  { id: 26, name: "Rohit", img: "https://randomuser.me/api/portraits/men/82.jpg" },
  { id: 27, name: "Yash", img: "https://randomuser.me/api/portraits/men/83.jpg" },
  { id: 28, name: "Kabir", img: "https://randomuser.me/api/portraits/men/84.jpg" },
  { id: 29, name: "Ishaan", img: "https://randomuser.me/api/portraits/men/85.jpg" },
  { id: 30, name: "Kunal", img: "https://randomuser.me/api/portraits/men/86.jpg" },
  { id: 31, name: "Aman", img: "https://randomuser.me/api/portraits/men/87.jpg" },
  { id: 32, name: "Siddharth", img: "https://randomuser.me/api/portraits/men/88.jpg" },
  { id: 33, name: "Manav", img: "https://randomuser.me/api/portraits/men/89.jpg" },
  { id: 34, name: "Raj", img: "https://randomuser.me/api/portraits/men/90.jpg" },
  { id: 35, name: "Harsh", img: "https://randomuser.me/api/portraits/men/91.jpg" },
  { id: 36, name: "Nikhil", img: "https://randomuser.me/api/portraits/men/92.jpg" },
  { id: 37, name: "Rajat", img: "https://randomuser.me/api/portraits/men/93.jpg" },
  { id: 38, name: "Tushar", img: "https://randomuser.me/api/portraits/men/94.jpg" },
  { id: 39, name: "Dev", img: "https://randomuser.me/api/portraits/men/95.jpg" },
  { id: 40, name: "Kartik", img: "https://randomuser.me/api/portraits/men/96.jpg" },
];






function getRandomUsers() {
  const shuffled = [...sampleUsers].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 10);
  return selected.map((user, i) => {
    const rand = Math.random();
    let status;
    if (rand < 0.4) status = "active"; // 40%
    else if (rand < 0.9) status = "offline"; // 50%
    else status = "on call"; // 10%

    return { ...user, status };
  });
}


function Home() {
  const [users, setUsers] = useState(getRandomUsers());
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setUsers(getRandomUsers());
    }, 30000); // update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-hero">
      <div className="overlay">

        {/* User Circles */}
        <motion.div
          className="user-bubbles d-flex flex-wrap justify-content-center mt-5"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {users.map((user, i) => (
            <motion.div
              key={i}
              className="user-circle text-center m-3"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              style={{ cursor: "pointer", position: "relative" }}
              onClick={() => navigate(`/profile/${user.id}`)}
            >
              {/* Top-right status badge */}
              <div
  className={`status-badge ${
    user.status === "active"
      ? "status-active"
      : user.status === "offline"
      ? "status-inactive"
      : "status-oncall"
  }`}
>
  {user.status === "active" ? "🟢" : user.status === "offline" ? "⚪" : "📞"}
</div>


              <img
                src={user.img}
                alt={user.name}
                className="profile-img"
              />
            </motion.div>
          ))}
        </motion.div>
                {/* Heading */}
        <motion.div
          className="text-center text-white hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="display-4 fw-bold text-dark">DateHub</h1>
          <p className="lead text-dark">
            Find your perfect match and start something beautiful today.
          </p>
          <motion.a
            href="/signup"
            whileHover={{ scale: 1.1 }}
            className="btn btn-lg btn-danger mt-3 px-4"
          >
            Get Started
          </motion.a>
        </motion.div>
       

{/* Feature Infographics Section */}
{/* Feature Infographics Section */}
<div className="feature-wrapper container mt-5 mb-5">
  <div className="row justify-content-center">
    <div className="col-12 col-md-6 d-flex justify-content-center mb-4">
      <img
        src="/ChatGPT Image Jul 30, 2025, 04_30_45 pM.png"
        alt="Why Choose Us 1"
        className="feature-img"
      />
    </div>
    <div className="col-12 col-md-6 d-flex justify-content-center mb-4">
      <img
        src="/ChatGPT Image Jul 30, 2025, 05_40_27 pM.png"
        alt="Why Choose Us 2"
        className="feature-img"
      />
    </div>
  </div>
</div>


      
      </div>

      {/* Floating Hearts */}
      <motion.div
        className="heart"
        style={{ left: "15%", bottom: 0 }}
        animate={{ y: [-20, -100], opacity: [1, 0] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "loop" }}
      >
        ❤️
      </motion.div>
      <motion.div
        className="heart"
        style={{ left: "50%", bottom: "50%" }}
        animate={{ y: [-20, -120], opacity: [1, 0] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "loop", delay: 1 }}
      >
        💖
      </motion.div>
      <motion.div
        className="heart"
        style={{ left: "80%", bottom: 0 }}
        animate={{ y: [-20, -110], opacity: [1, 0] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "loop", delay: 2 }}
      >
        💕
      </motion.div>
    </div>
  );
}

export default Home;
