import React from "react";
import { useParams } from "react-router-dom";
import sampleUsers from "../data/sampleUsers"; // Full user list with id, name, age, bio, image

function ProfilePage() {
  const { id } = useParams();
  const user = sampleUsers.find((u) => u.id === parseInt(id));

  if (!user) {
    return (
      <div className="text-center text-dark p-5 bg-light">
        <h2>User not found</h2>
      </div>
    );
  }

  return (
    <div className="container mt-5 text-center text-dark bg-light p-4 rounded shadow">
      <img
        src={user.image || user.img}
        alt={user.name}
        className="rounded-circle mb-3"
        width="150"
        height="150"
        style={{ objectFit: "cover", border: "3px solid #ff4d6d" }}
      />
      <h2>{user.name}</h2>
      {user.age && <p>Age: {user.age}</p>}
      <p className="text-muted">{user.bio || "No bio provided."}</p>
      <p>Status: {user.status || "login for more info"} <a href="/login">Login</a></p>
    </div>
  );
}

export default ProfilePage;
