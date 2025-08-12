import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';

const socket = io("http://localhost:5000");

export default function RecentChats({ userId }) {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/messages/recent/${userId}`);
      setChats(res.data);
    } catch (err) {
      console.error("Failed to fetch recent chats", err);
    }
  };

  useEffect(() => {
    fetchChats();
    socket.emit("user-connected", userId);

    socket.on("receive-message", () => {
      fetchChats();
    });

    return () => socket.off("receive-message");
  }, [userId]);

  return (
    <div className="list-group">
      {chats.map((chat, idx) => (
        <Link
          key={idx}
          to={`/chat/${chat.partner._id}`}
          className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        >
          <div>
            <strong>{chat.partner.name}</strong><br/>
            <small className="text-muted">{chat.lastMessage.text}</small>
          </div>
          {chat.unreadCount > 0 && (
            <span className="badge bg-danger rounded-pill">
              {chat.unreadCount > 4 ? '4+' : chat.unreadCount}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}
