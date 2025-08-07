import React from "react";
import { useNavigate } from "react-router-dom";

function UserCard({ user }) {
  const navigate = useNavigate();

  const handleChat = () => {
    navigate(`/chat/${user.id}`, { state: { user } });
  };

  return (
    <div className="card p-3">
      <img src={user.image} alt={user.name} className="card-img-top" />
      <h5 className="mt-2">{user.name}, {user.age}</h5>
      <p>{user.bio}</p>
      <div className="d-flex justify-content-center gap-3 mt-3">
        <button
          className="btn"
          style={{ backgroundColor: "#fa4768fd", color: "#fff" }}
          onClick={handleChat}
        >
          Chat
        </button>
        <button
          className="btn"
          style={{ backgroundColor: "#c90b2e", color: "#fff" }}
          onClick={() => navigate(`/profile/${user.id}`)}
          >Profile</button>
      </div>
    </div>
  );
}

export default UserCard;
