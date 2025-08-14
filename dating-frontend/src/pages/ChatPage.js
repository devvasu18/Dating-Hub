import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import RecentChats from "../components/RecentChats";
import ChatBox from "../components/Chatbox";
import "../styles/ChatPage.css";

export default function ChatsPage() {
  const [active, setActive] = useState(null);
  const [justReadId, setJustReadId] = useState(null);
  const [reloadChats, setReloadChats] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    if (location.state && location.state.user) {
      setActive({
        partnerId: location.state.user._id,
        partner: location.state.user,
      });
      setJustReadId(location.state.user._id);
    } else if (params.id) {
      fetch(`http://localhost:5000/api/users/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setActive({
            partnerId: data._id,
            partner: data,
          });
          setJustReadId(data._id);
        })
        .catch(() => setActive(null));
    }
  }, [location.state, params.id]);

  const handleSelect = async (item) => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    const currentUser = storedUser || {
      _id: localStorage.getItem("guestId"),
      name: localStorage.getItem("guestName") || "Guest",
      isGuest: !storedUser,
    };

    if (!currentUser.isGuest) {
      await fetch("http://localhost:5000/api/messages/mark-read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser._id,
          partnerId: item.partnerId,
        }),
      });
      setReloadChats((c) => c + 1);
    }

    setActive({
      partnerId: item.partnerId,
      partner: {
        _id: item.partnerId,
        name: item.partnerName || "Unknown",
        images: item.partnerImg ? [item.partnerImg] : [],
      },
    });
    setJustReadId(item.partnerId);

    try {
      const res = await fetch(`http://localhost:5000/api/users/${item.partnerId}`);
      if (!res.ok) throw new Error("User fetch failed");
      const data = await res.json();
      setActive({
        partnerId: item.partnerId,
        partner: data,
      });
    } catch (err) {
      console.warn("Failed to fetch user details, keeping fallback", err);
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-layout">
        <div className="chat-sidebar">
          <div className="sidebar-card">
            <h5 className="sidebar-title">Recent</h5>
            <RecentChats
              onSelect={handleSelect}
              selectedId={active?.partnerId}
              justReadId={justReadId}
              reload={reloadChats}
            />
          </div>
        </div>
        <div className="chat-main">
          {active ? (
            <ChatBox receiver={active.partner} onNewMessage={() => {}} />
          ) : (
            <div className="empty-chat-card">
              <h4>No chat selected</h4>
              <p className="empty-chat-subtitle">
                Start a conversation with someone new.
              </p>
              <button
                className="start-chat-btn"
                onClick={() => navigate("/discover")}
              >
                Start Chatting
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
