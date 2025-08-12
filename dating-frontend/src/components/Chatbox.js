// src/components/ChatBox.js
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import socket from "../socket";

export default function ChatBox({ receiver, onNewMessage }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const endRef = useRef();

  // Get current user consistently — support both "user" (real) and guest keys
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const currentUser = storedUser || {
    _id: localStorage.getItem("guestId"),
    name: localStorage.getItem("guestName") || "Guest",
    isGuest: !storedUser,
  };

  // utility: scroll to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // load messages on receiver change
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

    // tell server we're online
    socket.emit("user-connected", currentUser._id);

    // subscribe to live messages
    const handler = (msg) => {
      // msg should be { sender, receiver, text, time }
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
  }, [receiver?._id, currentUser._id]); // eslint-disable-line

  // send message
  const send = async () => {
    if (!text.trim() || !receiver?._id) return;

    const msg = {
      sender: currentUser._id,
      receiver: receiver._id,
      text: text.trim(),
      timestamp: new Date().toISOString(),
    };

    // guest -> save locally only (no DB)
    if (currentUser.isGuest) {
      const key = `chat-${currentUser._id}-${receiver._id}`;
      const local = JSON.parse(localStorage.getItem(key) || "[]");
      local.push(msg);
      localStorage.setItem(key, JSON.stringify(local));
      setMessages(local);
    } else {
      // logged-in user -> persist to backend
      try {
        await axios.post("http://localhost:5000/api/messages", {
          sender: msg.sender,
          receiver: msg.receiver,
          text: msg.text,
          timestamp: msg.timestamp,
        });
        // append local UI
        setMessages((p) => [...p, msg]);
      } catch (err) {
        console.error("Send message failed (API)", err);
        // fallback show locally anyway
        setMessages((p) => [...p, msg]);
      }
    }

    // emit via socket for live delivery
    socket.emit("send-message", {
      sender: msg.sender,
      receiver: msg.receiver,
      text: msg.text,
      timestamp: msg.timestamp,
    });

    setText("");
  };

  // UI
  return (
    <div className="card shadow" style={{ minHeight: 500 }}>
      <div className="card-body d-flex flex-column p-3">
        {/* Header */}
        <div className="d-flex align-items-center mb-3">
          <img
            src={receiver?.images?.[0] || "https://via.placeholder.com/80"}
            alt={receiver?.name || "User"}
            className="rounded-circle me-3"
            style={{ width: 56, height: 56, objectFit: "cover", border: "2px solid #fff" }}
          />
          <div>
            <h5 className="mb-0">{receiver?.name || "Unknown"}</h5>
            <small className="text-muted">{receiver?.bio ? receiver.bio.slice(0, 45) : ""}</small>
          </div>
        </div>

        {/* Messages */}
        <div
          className="flex-grow-1 mb-3 p-3 rounded"
          style={{ overflowY: "auto", background: "#f6f8fb" }}
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
                className={`d-flex mb-2 ${mine ? "justify-content-end" : "justify-content-start"}`}
              >
                <div
                  className={`p-2 rounded ${mine ? "bg-primary text-white" : "bg-white border"}`}
                  style={{ maxWidth: "80%" }}
                >
                  <div>{m.text}</div>
                  <div className="text-muted" style={{ fontSize: 12 }}>
                    {new Date(m.time || m.timestamp || Date.now()).toLocaleTimeString([], {
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
