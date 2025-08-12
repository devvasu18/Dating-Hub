// src/pages/ChatsPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecentChats from "../components/RecentChats";
import ChatBox from "../components/Chatbox";

export default function ChatsPage() {
  const [active, setActive] = useState(null); // { partnerId, partnerName, partnerImg, lastMessage }
  const navigate = useNavigate();

  const handleSelect = async (item) => {
    // item.partnerId might be an id — we need full receiver object
    // attempt to fetch user by id
    try {
      const res = await fetch(`http://localhost:5000/api/users/${item.partnerId}`);
      const data = await res.json();
      setActive({ partnerId: item.partnerId, partner: data });
    } catch (err) {
      // fallback minimal partner object
      setActive({ partnerId: item.partnerId, partner: { _id: item.partnerId, name: item.partnerName } });
    }
  };

  return (
    <div className="container py-4">
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card shadow-sm" style={{ minHeight: 520 }}>
            <div className="card-body">
              <h5>Recent</h5>
              <RecentChats onSelect={handleSelect} selectedId={active?.partnerId} />
            </div>
          </div>
        </div>

        <div className="col-md-8">
          {active ? (
            <ChatBox receiver={active.partner} onNewMessage={() => {}} />
          ) : (
            <div className="card shadow p-5 text-center" style={{ minHeight: 520 }}>
              <h4>No chat selected</h4>
              <p className="text-muted">Start a conversation with someone new.</p>
              <button className="btn btn-primary" onClick={() => navigate("/discover")}>
                Start Chatting
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
