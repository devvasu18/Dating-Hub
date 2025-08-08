import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io("http://localhost:5000");

const ChatBox = ({ receiver }) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem("user")) || {
    _id: localStorage.getItem("guestId"),
    name: localStorage.getItem("guestName") || "Guest",
    isGuest: true,
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const loadMessages = async () => {
      if (!receiver?._id || !currentUser._id) return;

      if (currentUser.isGuest) {
        const key = `chat-${currentUser._id}-${receiver._id}`;
        const local = JSON.parse(localStorage.getItem(key)) || [];
        setMessages(local);
      } else {
        try {
          const res = await axios.get(`http://localhost:5000/api/messages/${currentUser._id}/${receiver._id}`);
          setMessages(res.data);
        } catch (err) {
          console.error("Failed to load messages", err);
        }
      }
    };

    loadMessages();

    socket.emit("user-connected", currentUser._id);

    socket.on("receive-message", (msg) => {
      if (
        (msg.senderId === receiver._id && msg.receiverId === currentUser._id) ||
        (msg.senderId === currentUser._id && msg.receiverId === receiver._id)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off("receive-message");
    };
  }, [receiver?._id, currentUser._id, currentUser.isGuest]);

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!text.trim() || !receiver?._id) {
      console.warn("Missing receiverId or message");
      return;
    }

    const msg = {
      senderId: currentUser._id,
      receiverId: receiver._id,
      text,
      timestamp: new Date().toISOString(),
    };

    if (currentUser.isGuest) {
      const key = `chat-${currentUser._id}-${receiver._id}`;
      const local = JSON.parse(localStorage.getItem(key)) || [];
      local.push(msg);
      localStorage.setItem(key, JSON.stringify(local));
      setMessages(local);
    } else {
      try {
        await axios.post("http://localhost:5000/api/messages", msg);
        setMessages((prev) => [...prev, msg]);
      } catch (err) {
        console.error("Send message failed", err);
      }
    }

    socket.emit("send-message", msg);
    setText("");
  };

  return (
    <div className="card mx-auto shadow p-3" style={{ maxWidth: "600px" }}>
      <div
        className="chat-body mb-3 border rounded p-3"
        style={{ height: "350px", overflowY: "auto", backgroundColor: "#f9f9f9" }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 my-2 rounded w-75 ${
              msg.senderId === currentUser._id ? "ms-auto bg-primary text-white" : "me-auto bg-light"
            }`}
          >
            <small>{msg.text}</small>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      <div className="input-group">
        <input
          className="form-control"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="btn btn-success" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
