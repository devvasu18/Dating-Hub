import React from "react";
import { useNavigate } from "react-router-dom";

function UserCard({ user }) {
  const navigate = useNavigate();

  const handleChat = () => {
    const guestId = localStorage.getItem("guestId");
    const guestName = localStorage.getItem("guestName");

    navigate(`/chat/${user._id}`, {
      state: {
        user, // receiver
        guest: {
          id: guestId,
          name: guestName,
        },
      },
    });
  };

  return (
    <div
      className="card p-3 d-flex flex-column"
      style={{
        height: "100%",
        maxHeight: "400px",
        minHeight: "400px",
      }}
    >
      <img
        src={user.images?.[0] || "https://img.freepik.com/premium-vector/social-media-logo_1305298-29989.jpg"}
        alt={user.name || "User"}
        className="card-img-top mb-2"
        style={{
          height: "200px",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />

      <div style={{ flexGrow: 1 }}>
        <h5 className="text-truncate mb-1" title={user.name}>
          {user.name ? `${user.name}, ${user.age}` : "Unknown User"}
        </h5>

        <p
          style={{
            fontSize: "14px",
            maxHeight: "60px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {user.bio || "No bio available."}
        </p>
      </div>

      <div className="d-flex justify-content-center gap-3 mt-auto pt-2">
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
          onClick={() => navigate(`/profile/${user._id}`)}
        >
          Profile
        </button>
      </div>
    </div>
  );
}

export default UserCard;

