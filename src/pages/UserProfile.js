import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const sampleUsers = [
  {
    id: "1",
    name: "Priya Sharma",
    age: 24,
    gender: "Female",
    bio: "Book lover, coffee addict, and dog mom.",
    interests: "Reading, Yoga, Traveling",
    image: "https://i.pinimg.com/736x/d2/38/de/d238deeadabed399debaed1a2aa1a650.jpg",
  },
  {
    id: "2",
    name: "Rahul Mehta",
    age: 27,
    gender: "Male",
    bio: "Cricket fan who loves coding and memes.",
    interests: "Coding, Cricket, Music",
    image: "https://previews.123rf.com/images/realityimages/realityimages1803/realityimages180300947/97894651-indian-boy-with-hand-on-chin-pune-at-maharashtra.jpg",
  },
  {
    id: "3",
    name: "Simran Kaur",
    age: 23,
    gender: "Female",
    bio: "Dancer, dreamer, foodie 💃",
    interests: "Dancing, Cooking, Traveling",
    image: "https://photosmint.com/wp-content/uploads/2025/03/Indian-Beauty-DP.jpeg",
  },
];

function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = sampleUsers.find((u) => u.id === id);

  if (!user) {
    return <h2 className="text-center mt-5">User not found</h2>;
  }

  return (
    <div className="container mt-5">
      <div className="card mx-auto p-4 shadow-lg" style={{ maxWidth: "600px" }}>
        <img src={user.image} alt={user.name} className="card-img-top rounded" />
        <div className="card-body text-center">
          <h3>{user.name}, {user.age}</h3>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Bio:</strong> {user.bio}</p>
          <p><strong>Interests:</strong> {user.interests}</p>
          <button className="btn btn-success mt-2" onClick={() => navigate("/chat")}>
            Message 💬
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
