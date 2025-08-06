import React, { useEffect, useState } from "react";
import socket from "../socket"; // path to your socket.js

function Chat({ currentUserId, receiverUserId }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // 1. Identify user when component mounts
  useEffect(() => {
    socket.emit("add-user", currentUserId);
  }, [currentUserId]);

  // 2. Listen for incoming messages
  useEffect(() => {
    socket.on("msg-receive", (data) => {
      console.log("📥 Message received:", data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("msg-receive");
    };
  }, []);

  // 3. Send message
  const handleSend = () => {
    const newMsg = {
      senderId: currentUserId,
      receiverId: receiverUserId,
      message: message,
    };

    socket.emit("send-msg", newMsg);
    setMessages((prev) => [...prev, { from: currentUserId, message }]);
    setMessage("");
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            <b>{msg.from === currentUserId ? "You" : "Them"}:</b> {msg.message}
          </p>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default Chat;
