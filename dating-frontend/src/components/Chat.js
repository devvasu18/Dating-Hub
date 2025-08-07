import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000"); // Replace with your backend URL

function Chat() {
  const { userId } = useParams();
  const { state } = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("user")); // logged in user
  const otherUser = state?.user;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Fetch previous messages
    axios.get(`http://localhost:5000/api/messages/${currentUser.id}/${userId}`)

      .then(res => setMessages(res.data))
      .catch(err => console.error(err));
  }, [userId]);

  useEffect(() => {
    // Join room and listen for new messages
    socket.emit("joinRoom", { senderId: currentUser.id, receiverId: userId });

    socket.on("newMessage", (message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [userId]);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const messageData = {
      senderId: currentUser.id,
      receiverId: userId,
      text: input,
    };

    socket.emit("sendMessage", messageData);
    setMessages([...messages, messageData]);

   await axios.post("http://localhost:5000/api/messages", messageData);

    setInput("");
  };

  return (
    <div className="container mt-5">
      <h4>{otherUser?.name}~</h4>
      <div className="chat-box border p-3 mb-3" style={{ maxHeight: 400, overflowY: "auto" }}>
        {messages.map((msg, index) => (
          <div key={index} className={`text-${msg.senderId === currentUser.id ? "end" : "start"}`}>
            <span className={`badge ${msg.senderId === currentUser.id ? "bg-success" : "bg-secondary"}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="d-flex">
        <input
          type="text"
          className="form-control me-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
