import React from "react";
import { useParams, useNavigate } from "react-router-dom";

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
    image: "https://previews.123rf.com/images/realityimages/realityimages1803/realityimages180300947/97894651-indian-boy-with-hand-on-chin-pune-at-maharashtra.jpg",
  },
  {
    id: 3,
    name: "Simran Kaur",
    age: 23,
    bio: "Dancer, dreamer, foodie 💃",
    image: "https://photosmint.com/wp-content/uploads/2025/03/Indian-Beauty-DP.jpeg",
  },
  {
    id: 4,
    name: "Riya Verma",
    age: 25,
    bio: "Adventurer and animal lover 🐾",
    image: "https://i.pinimg.com/736x/d6/0d/63/d60d6375b67920600dbb0db1a5c346ae.jpg",
  },
  {
    id: 5,
    name: "Aman Joshi",
    age: 26,
    bio: "Cricket fan and coder 🏏",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: 6,
    name: "Anjali Gupta",
    age: 22,
    bio: "Gym freak & dog mom 💪🐶",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 7,
    name: "Saurabh Singh",
    age: 28,
    bio: "Photographer, traveler, dreamer 📸",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
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
