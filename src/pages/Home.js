import React from "react";
import { motion } from "framer-motion";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-hero">
      <div className="overlay">
        <motion.div
          className="text-center text-white hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="display-4 fw-bold">  DateHub</h1>
          <p className="lead">
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
      </div>

      {/* Optional floating hearts */}
      <motion.div
        className="heart"
        style={{ left: "15%", bottom: 0 }}
        animate={{ y: [-20, -100], opacity: [1, 0] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "loop", delay: 0 }}
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
