import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import RecentChats from "../components/RecentChats";
import ChatBox from "../components/Chatbox";

export default function ChatsPage() {
  const [active, setActive] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  // Set active chat if navigated from Discover (with state) or via /chat/:id
  useEffect(() => {
    // If navigated with state (from Discover)
    if (location.state && location.state.user) {
      setActive({
        partnerId: location.state.user._id,
        partner: location.state.user,
      });
    }
    // If navigated directly to /chat/:id (refresh or manual)
    else if (params.id) {
      // Fetch user details from backend
      fetch(`http://localhost:5000/api/users/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setActive({
            partnerId: data._id,
            partner: data,
          });
        })
        .catch(() => setActive(null));
    }
  }, [location.state, params.id]);

  const handleSelect = async (item) => {
    setActive({
      partnerId: item.partnerId,
      partner: {
        _id: item.partnerId,
        name: item.partnerName || "Unknown",
        images: item.partnerImg ? [item.partnerImg] : [],
      },
    });

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
    <div className="container py-4">
      <div className="row g-3">
        {/* Recent Chats List */}
        <div className="col-md-4">
          <div className="card shadow-sm" style={{ minHeight: 520 }}>
            <div className="card-body">
              <h5>Recent</h5>
              <RecentChats onSelect={handleSelect} selectedId={active?.partnerId} />
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="col-md-8">
          {active ? (
            <ChatBox receiver={active.partner} onNewMessage={() => {}} />
          ) : (
            <div className="card shadow p-5 text-center" style={{ minHeight: 520 }}>
              <h4>No chat selected</h4>
              <p className="text-muted">Start a conversation with someone new.</p>
              <button
                className="btn btn-primary"
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