// src/components/ChatBox.js
import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io("http://localhost:5000");

const ChatBox = ({ receiver }) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  const storedUser = JSON.parse(localStorage.getItem("user"));


  const currentUser = storedUser || {
    _id: localStorage.getItem("guestId"),
    name: localStorage.getItem("guestName") || "Guest",
    isGuest: !storedUser,
  };
  console.log("currentUser from localStorage:", currentUser);
  useEffect(() => {
    if (!receiver?._id || !currentUser._id) return;

    const loadMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/messages/${currentUser._id}/${receiver._id}`);
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    };

    loadMessages();

    socket.emit("user-connected", currentUser._id);

    socket.on("receive-message", (msg) => {
      // msg is { sender, receiver, text, time }
      if (
        (msg.sender === receiver._id && msg.receiver === currentUser._id) ||
        (msg.sender === currentUser._id && msg.receiver === receiver._id)
      ) {
        setMessages(prev => [...prev, msg]);
      }
    });

    return () => socket.off("receive-message");
  }, [receiver?._id, currentUser._id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim() || !receiver?._id) return;

    const msg = {
      sender: currentUser._id,
      receiver: receiver._id,
      text: text.trim(),
      timestamp: new Date().toISOString(),
    };

    // Post to server for persistence (recommended)
    try {
      await axios.post("http://localhost:5000/api/messages", msg);
      setMessages(prev => [...prev, msg]);
    } catch (err) {
      console.error("Send message failed (API)", err);
      // fallback: still show locally
      setMessages(prev => [...prev, msg]);
    }

    // send via socket so recipient gets it live
    socket.emit("send-message", msg);
    setText("");
  };

  return (
    <div className="card mx-auto p-3" style={{ maxWidth: 700 }}>
      <div style={{ height: 380, overflowY: 'auto', background: '#f6f7fb' }} className="p-3 mb-3 rounded">
        {messages.map((m, i) => (
          <div key={i} className={`p-2 my-2 rounded w-75 ${m.sender === currentUser._id ? 'ms-auto bg-primary text-white' : 'me-auto bg-light'}`}>
            <div>{m.text}</div>
            <div className="text-muted" style={{ fontSize: '0.8em' }}>
             <small>
             {new Date(m.time || m.timestamp || Date.now())
             .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
             </small>

            </div>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      <div className="input-group">
        <input className="form-control" value={text} onChange={e => setText(e.target.value)} placeholder="Type a message..." />
        <button className="btn btn-success" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
