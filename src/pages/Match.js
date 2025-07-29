import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Match() {
  const [matchedUsers, setMatchedUsers] = useState([]);
  const navigate = useNavigate();

  // Load liked users from localStorage on mount
  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likedUsers")) || [];
    setMatchedUsers(storedLikes);
  }, []);

  // Handle unmatch for a single user
  const handleUnmatch = (id) => {
    const updatedMatches = matchedUsers.filter((user) => user.id !== id);
    setMatchedUsers(updatedMatches);
    localStorage.setItem("likedUsers", JSON.stringify(updatedMatches));
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
              key={user.id}
              className="col-md-4 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card text-center shadow-sm">
                <Link to={`/profile/${user.id}`}>
                  <img src={user.image} className="card-img-top user-img" alt={user.name} />
                </Link>

                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text">{user.bio}</p>
                  <div className="d-flex justify-content-around">
                    <button className="btn btn-primary" onClick={() => navigate("/chat")}>
                      Message 💬
                    </button>
                    <button className="btn btn-outline-danger" onClick={() => handleUnmatch(user.id)}>
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
