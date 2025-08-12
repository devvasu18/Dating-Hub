import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import socket from "../socket";

export default function ChatBox({ receiver, onNewMessage }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const endRef = useRef();

  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const currentUser = storedUser || {
    _id: localStorage.getItem("guestId"),
    name: localStorage.getItem("guestName") || "Guest",
    isGuest: !storedUser,
  };

  // Scroll to bottom on new messages
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load messages when receiver changes
  useEffect(() => {
    if (!receiver?._id || !currentUser?._id) {
      setMessages([]);
      return;
    }

    const load = async () => {
      if (currentUser.isGuest) {
        const key = `chat-${currentUser._id}-${receiver._id}`;
        const local = JSON.parse(localStorage.getItem(key) || "[]");
        setMessages(local);
      } else {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/messages/${currentUser._id}/${receiver._id}`
          );
          setMessages(res.data || []);
        } catch (err) {
          console.error("Failed to load messages", err);
          setMessages([]);
        }
      }
    };

    load();
    socket.emit("user-connected", currentUser._id);

    const handler = (msg) => {
      if (
        (msg.sender === receiver._id && msg.receiver === currentUser._id) ||
        (msg.sender === currentUser._id && msg.receiver === receiver._id)
      ) {
        setMessages((p) => [...p, msg]);
        if (onNewMessage) onNewMessage(msg);
      }
    };
    socket.on("receive-message", handler);

    return () => {
      socket.off("receive-message", handler);
    };
  }, [receiver, currentUser._id]); // track full receiver object

  // Send a message
  const send = async () => {
    if (!text.trim() || !receiver?._id) return;

    const msg = {
      sender: currentUser._id,
      receiver: receiver._id,
      text: text.trim(),
      timestamp: new Date().toISOString(),
    };

    if (currentUser.isGuest) {
      const key = `chat-${currentUser._id}-${receiver._id}`;
      const local = JSON.parse(localStorage.getItem(key) || "[]");
      local.push(msg);
      localStorage.setItem(key, JSON.stringify(local));
      setMessages(local);
    } else {
      try {
        await axios.post("http://localhost:5000/api/messages", msg);
        setMessages((p) => [...p, msg]);
      } catch (err) {
        console.error("Send message failed", err);
        setMessages((p) => [...p, msg]);
      }
    }

    socket.emit("send-message", msg);
    setText("");
  };

  return (
    <div className="card shadow" style={{ minHeight: 500 }}>
      <div className="card-body d-flex flex-column p-3">
        {/* Header */}
        <div className="d-flex align-items-center mb-3">
          <img
            src={receiver?.images?.[0] || "https://img.freepik.com/premium-vector/social-media-logo_1305298-29989.jpg"}
            alt={receiver?.name || "User"}
            className="rounded-circle me-3"
            style={{
              width: 56,
              height: 56,
              objectFit: "cover",
              border: "2px solid #fff",
            }}
          />
          <div>
            <h5 className="mb-0">{receiver?.name || "Unknown"}</h5>
            <small className="text-muted">
              {receiver?.bio ? receiver.bio.slice(0, 45) : ""}
            </small>
          </div>
        </div>

        {/* Messages */}
        <div
          className="flex-grow-1 mb-3 p-3 rounded"
         style={{
    overflowY: "auto",
    background: "#f6f8fb",
    height: "400px",          // ✅ fixed height
    maxHeight: "60vh"         // ✅ or make it responsive
  }}
        >
          {messages.length === 0 && (
            <div className="text-center text-muted mt-5">
              <p>No messages yet — start the conversation 👋</p>
            </div>
          )}
          {messages.map((m, i) => {
            const mine = m.sender === currentUser._id;
            return (
              <div
                key={i}
                className={`d-flex mb-2 ${
                  mine ? "justify-content-end" : "justify-content-start"
                }`}
              >
                <div
                  className={`p-2 rounded ${
                    mine ? "bg-primary text-white" : "bg-white border"
                  }`}
                  style={{ maxWidth: "80%" }}
                >
                  <div>{m.text}</div>
                  <div className="text-muted" style={{ fontSize: 12 }}>
                    {new Date(
                      m.time || m.timestamp || Date.now()
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="input-group">
          <input
            className="form-control"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
          />
          <button className="btn btn-success" onClick={send}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
