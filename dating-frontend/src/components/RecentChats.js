// src/components/RecentChats.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";

export default function RecentChats({ onSelect, selectedId }) {
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const currentUser = storedUser || {
    _id: localStorage.getItem("guestId"),
    name: localStorage.getItem("guestName") || "Guest",
    isGuest: !storedUser,
  };

  const [items, setItems] = useState([]); // { partnerId, partnerName, partnerImg, lastMessage, unreadCount }

  useEffect(() => {
    const load = async () => {
      if (!currentUser._id) return;
      if (currentUser.isGuest) {
        // scan localStorage keys for chat-guestId-*
        const prefix = `chat-${currentUser._id}-`;
        const keys = Object.keys(localStorage).filter((k) => k.startsWith(prefix));
        const list = keys.map((k) => {
          const partnerId = k.replace(prefix, "");
          const arr = JSON.parse(localStorage.getItem(k) || "[]");
          const last = arr[arr.length - 1];
          return {
            partnerId,
            partnerName: last?.receiverName || partnerId,
            partnerImg: null,
            lastMessage: last?.text || "",
            unreadCount: 0,
          };
        });
        setItems(list);
      } else {
        // logged-in: call server endpoint that returns recent chats for this user.
        try {
          const res = await axios.get(`http://localhost:5000/api/chats/recent/${currentUser._id}`);
          setItems(res.data || []);
        } catch (err) {
          console.warn("Failed to load recent chats (backend may not implement the endpoint)", err);
          setItems([]);
        }
      }
    };

    load();

    // listen for new incoming messages via socket and refresh small
    const handler = (msg) => {
      if (!msg) return;
      // If message involves current user, refresh recent list or update locally
      if (msg.receiver === currentUser._id || msg.sender === currentUser._id) {
        // naive: reload
        setTimeout(() => load(), 200);
      }
    };
    socket.on("receive-message", handler);
    socket.on("send-message", handler);

    return () => {
      socket.off("receive-message", handler);
      socket.off("send-message", handler);
    };
  }, [currentUser._id]);

  if (items.length === 0)
    return (
      <div className="p-3 text-center text-muted">
        <p>No recent chats</p>
      </div>
    );

  return (
    <div className="list-group list-group-flush">
      {items.map((it) => (
        <button
          key={it.partnerId}
          className={`list-group-item list-group-item-action d-flex align-items-center ${
            selectedId === it.partnerId ? "active" : ""
          }`}
          onClick={() => onSelect(it)}
        >
          <img
            src={it.partnerImg || "https://via.placeholder.com/48"}
            alt={it.partnerName}
            style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 8 }}
            className="me-3"
          />
          <div className="flex-grow-1 text-start">
            <div className="d-flex justify-content-between">
              <strong>{it.partnerName}</strong>
              {it.unreadCount > 0 && (
                <span className="badge bg-danger ms-2">{it.unreadCount}</span>
              )}
            </div>
            <div className="text-muted" style={{ fontSize: 13 }}>
              {it.lastMessage?.slice(0, 40)}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
