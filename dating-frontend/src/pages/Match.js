import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
function Match() {
  const [matchedUsers, setMatchedUsers] = useState([]);
  const navigate = useNavigate();

 useEffect(() => {
  const fetchLikedUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/users/liked", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMatchedUsers(res.data);
    } catch (err) {
      console.error("Error fetching liked users:", err.response?.data || err.message);
    }
  };

  fetchLikedUsers();
}, []);


    const handleUnmatch = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/users/unmatch/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMatchedUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (err) {
      console.error("Error unmatching user:", err.response?.data || err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">💘 Your Matches</h2>

      {matchedUsers.length === 0 ? (
        <p className="text-center">No matches yet. Go to Discover and start liking people!</p>
      ) : (
        <div className="row justify-content-center">
        {matchedUsers.map((user) => (
  <motion.div
    key={user._id}
    className="col-md-4 mb-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="card text-center shadow-sm">
      <Link to={`/profile/${user._id}`}>
        <img src={user.image} className="card-img-top user-img" alt={user.name} />
      </Link>
      <div className="card-body">
        <h5 className="card-title">{user.name}</h5>
        <p className="card-text">{user.bio}</p>
        <div className="d-flex justify-content-around">
          <button className="btn btn-primary" onClick={() => navigate("/chat")}>
            Message 💬
          </button>
          <button className="btn btn-outline-danger" onClick={() => handleUnmatch(user._id)}>
            Remove
          </button>
        </div>
      </div>
    </div>
  </motion.div>
))}
      </div>
    )}
  </div>
);
}

export default Match;
