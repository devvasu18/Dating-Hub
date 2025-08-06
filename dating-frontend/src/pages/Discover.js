import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toast, ToastContainer } from 'react-bootstrap';
import { motion } from "framer-motion";
import UserCard from "../components/UserCard";
const sampleUsers = [
  { id: 20, name: "Zoya Ali", age: 22, bio: "Wanderer at heart, food in hand ✈️🍕", image: "https://randomuser.me/api/portraits/women/48.jpg" },
  { id: 40, name: "Kartik Bhatt", age: 20, bio: "Vlogging, vibing, and vada pav 📹🎉", image: "https://randomuser.me/api/portraits/men/96.jpg" },
  { id: 7, name: "Ishita Joshi", age: 18, bio: "I paint my world with colors and dreams 🎨💭", image: "https://randomuser.me/api/portraits/women/87.jpg" },
  { id: 6, name: "Saanvi Arora", age: 18, bio: "Yoga in the morning, memes at night 🧘‍♀️😂", image: "https://randomuser.me/api/portraits/women/86.jpg" },
  { id: 34, name: "Raj Patel", age: 27, bio: "Chai guy with desi vibes ☕🎶", image: "https://randomuser.me/api/portraits/men/90.jpg" },
  { id: 19, name: "Aisha Qureshi", age: 22, bio: "Self-care, skincare, and sarcasm 🧴😌", image: "https://randomuser.me/api/portraits/women/47.jpg" },
  { id: 4, name: "Kavya Kapoor", age: 18, bio: "Introvert with a poetic soul ✍️💫", image: "https://randomuser.me/api/portraits/women/84.jpg" },
  { id: 33, name: "Manav Thakur", age: 21, bio: "Anime, art, and andas 🍳🎨", image: "https://randomuser.me/api/portraits/men/89.jpg" },
  { id: 27, name: "Yash Batra", age: 22, bio: "Photographer by passion, hustler by nature 📸🚀", image: "https://randomuser.me/api/portraits/men/83.jpg" },
  { id: 39, name: "Dev Kapoor", age: 28, bio: "Gym rat & green tea fan 🏋️🍵", image: "https://randomuser.me/api/portraits/men/95.jpg" },
  { id: 8, name: "Avni Singh", age: 18, bio: "Tea lover, sunset chaser 🌇🫖", image: "https://randomuser.me/api/portraits/women/88.jpg" },
  { id: 29, name: "Ishaan Malhotra", age: 28, bio: "Stock market, sports, and samosas 📈🏏", image: "https://randomuser.me/api/portraits/men/85.jpg" },
  { id: 3, name: "Tanya Gupta", age: 18, bio: "Photography addict & Netflix binge watcher 📸🎬", image: "https://randomuser.me/api/portraits/women/83.jpg" },
  { id: 30, name: "Kunal Tyagi", age: 20, bio: "College gamer with startup dreams 🎮💡", image: "https://randomuser.me/api/portraits/men/86.jpg" },
  { id: 2, name: "Diya Mehta", age: 18, bio: "Explorer of food streets and filter coffee ☕🍜", image: "https://randomuser.me/api/portraits/women/82.jpg" },
  { id: 36, name: "Nikhil Joshi", age: 26, bio: "Debater, dreamer, Delhiite 🎤🏙️", image: "https://randomuser.me/api/portraits/men/92.jpg" },
  { id: 12, name: "Anvi Rathore", age: 18, bio: "Books, rain, and soft music 📖🌧️", image: "https://randomuser.me/api/portraits/women/92.jpg" },
  { id: 21, name: "Niharika Rao", age: 22, bio: "Big smiles, bold dreams 😁🌈", image: "https://randomuser.me/api/portraits/women/49.jpg" },
  { id: 38, name: "Tushar Yadav", age: 25, bio: "Coffee coding nights ☕💻🌙", image: "https://randomuser.me/api/portraits/men/94.jpg" },
  { id: 10, name: "Riya Bansal", age: 18, bio: "Fashion, makeup, and fairy lights 💄✨", image: "https://randomuser.me/api/portraits/women/90.jpg" },
  { id: 26, name: "Rohit Sharma", age: 27, bio: "Marketing mind, meme king 🧠😄", image: "https://randomuser.me/api/portraits/men/82.jpg" },
  { id: 11, name: "Neha Verma", age: 18, bio: "Stand-up comedy + poetry = me 🎤📚", image: "https://randomuser.me/api/portraits/women/91.jpg" },
  { id: 18, name: "Ira Khurana", age: 22, bio: "Mindful mornings and messy buns ☀️🌀", image: "https://randomuser.me/api/portraits/women/46.jpg" },
  { id: 16, name: "Muskan Sinha", age: 22, bio: "Dance, drama, and dog cuddles 💃🐶", image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 35, name: "Harsh Rana", age: 24, bio: "Tech recruiter & table tennis champ 🏓🧑‍💼", image: "https://randomuser.me/api/portraits/men/91.jpg" },
  { id: 32, name: "Siddharth Rawat", age: 23, bio: "Engineer with a passion for travel and tech ✈️👨‍💻", image: "https://randomuser.me/api/portraits/men/88.jpg" },
  { id: 13, name: "Simran Kaur", age: 22, bio: "Bookworm, chai lover, and deep talks 📚☕", image: "https://randomuser.me/api/portraits/women/41.jpg" },
  { id: 23, name: "Kiara Naik", age: 22, bio: "Coding + coffee + cat naps ☕💻🐱", image: "https://randomuser.me/api/portraits/women/60.jpg" },
  { id: 1, name: "Aanya Sharma", age: 18, bio: "I love dancing, sunsets, and late-night conversations 🌅💃", image: "https://randomuser.me/api/portraits/women/81.jpg" },
  { id: 37, name: "Rajat Singh", age: 22, bio: "Books in bag, beats in ears 📚🎧", image: "https://randomuser.me/api/portraits/men/93.jpg" },
  { id: 5, name: "Meera Jain", age: 18, bio: "Music, journaling, and mirror selfies 🎶🪞", image: "https://randomuser.me/api/portraits/women/85.jpg" },
  { id: 22, name: "Lavanya Bhatt", age: 22, bio: "Drama queen on weekends 🎭👑", image: "https://randomuser.me/api/portraits/women/50.jpg" },
  { id: 15, name: "Aaradhya Iyer", age: 22, bio: "Bollywood beats and biryani lover 🎶🍛", image: "https://randomuser.me/api/portraits/women/43.jpg" },
  { id: 9, name: "Charvi Desai", age: 18, bio: "Skater girl who writes rhymes 🛹📝", image: "https://randomuser.me/api/portraits/women/89.jpg" },
  { id: 31, name: "Aman Chauhan", age: 26, bio: "Poet, podcaster, peace lover 🎤🕊️", image: "https://randomuser.me/api/portraits/men/87.jpg" },
  { id: 25, name: "Arjun Mehta", age: 24, bio: "Fitness freak, foodie, and tech geek 💪🍔💻", image: "https://randomuser.me/api/portraits/men/81.jpg" },
  { id: 24, name: "Ritika Das", age: 22, bio: "Late night laughs and life chats 🌃🗣️", image: "https://randomuser.me/api/portraits/women/61.jpg" },
  { id: 28, name: "Kabir Anand", age: 25, bio: "Beard, bike, and bhature 🏍️🧔", image: "https://randomuser.me/api/portraits/men/84.jpg" },
  { id: 14, name: "Tanvi Mishra", age: 22, bio: "Adventurous soul with a creative twist 🧗‍♀️🎨", image: "https://randomuser.me/api/portraits/women/42.jpg" },
  { id: 17, name: "Khushi Malhotra", age: 22, bio: "Content creator & closet philosopher 🎥🧠", image: "https://randomuser.me/api/portraits/women/45.jpg" }
];




function Discover() {
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [users, setUsers] = useState(sampleUsers);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [batchSize, setBatchSize] = useState(6);

  useEffect(() => {
    // Determine screen size and set batch
    const handleResize = () => {
      const width = window.innerWidth;
      setBatchSize(width < 768 ? 4 : 6);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setDisplayedUsers(users.slice(0, batchSize));
  }, [users, batchSize]);

  const showActionToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };
const handleLike = async (likedUserId, likedUserName) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
  `http://localhost:5000/api/users/like/${likedUserId}`,
  {},
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    const likedUserData = response.data.likedUser;

    // 1. Remove from discover list
  const updatedUsers = users.filter((user) => user._id !== likedUserId);

    setUsers(updatedUsers);

    // 2. Save to localStorage for liked page
    const likedUsers = JSON.parse(localStorage.getItem("likedUsers")) || [];
    likedUsers.push({
      id: likedUserData._id,
      name: likedUserData.name,
      bio: likedUserData.bio,
      image: likedUserData.image,
    });
    localStorage.setItem("likedUsers", JSON.stringify(likedUsers));

    // 3. Show success
    showActionToast(`❤️ You liked ${likedUserName}`);
  } catch (err) {
    console.error("Error liking user:", err.response?.data || err.message);
    showActionToast("❌ Failed to like user");
  }
};



  const handlePass = (userName) => {
    const updatedUsers = users.filter((user) => user.name !== userName);
    setUsers(updatedUsers);
    showActionToast(`❌ You passed on ${userName}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Discover New People</h2>
      <div className="row justify-content-center">
        {displayedUsers.map((user) => (
          <motion.div
  key={user._id}
  className="col-md-4 mb-4"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>

        <UserCard onLike={() => handleLike(user._id, user.name)} />


          </motion.div>
        ))}
      </div>

      <ToastContainer position="bottom-center" className="mb-4">
        <Toast bg="dark" show={showToast} onClose={() => setShowToast(false)} delay={2500} autohide>
          <Toast.Body className="text-white text-center">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default Discover;