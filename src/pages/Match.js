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

  // Handle Clear Matches
  const handleClear = () => {
    localStorage.removeItem("likedUsers");
    setMatchedUsers([]);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">💘 Your Matches</h2>

      {matchedUsers.length === 0 ? (
        <p className="text-center">No matches yet. Go to Discover and start liking people!</p>
      ) : (
        <>
          <div className="text-center mb-4">
            <button className="btn btn-danger" onClick={handleClear}>
              Clear All Matches
            </button>
          </div>

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
                    <img src={user.image} className="card-img-top" alt={user.name} />
                  </Link>

                  <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">{user.bio}</p>
                    <button className="btn btn-primary" onClick={() => navigate("/chat")}>
                      Message 💬
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Match;
