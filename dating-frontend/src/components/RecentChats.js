import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";
import "../styles/ChatPage.css";

export default function RecentChats({ onSelect, selectedId, justReadId, reload = 0 }) {
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const currentUser = storedUser || {
    _id: localStorage.getItem("guestId"),
    name: localStorage.getItem("guestName") || "Guest",
    isGuest: !storedUser,
  };

  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      if (!currentUser._id) return;

   if (currentUser.isGuest) {
  const prefix = `chat-${currentUser._id}-`;
  const keys = Object.keys(localStorage).filter((k) => k.startsWith(prefix));
  const list = keys.map((k) => {
    const partnerId = k.replace(prefix, "");
    const arr = JSON.parse(localStorage.getItem(k) || "[]");
    const last = arr[arr.length - 1];
    // If guest is sender, show receiverName; if guest is receiver, show senderName
    let partnerName = partnerId;
    if (last) {
      if (last.sender === currentUser._id && last.receiverName) {
        partnerName = last.receiverName;
      } else if (last.receiver === currentUser._id && last.senderName) {
        partnerName = last.senderName;
      }
    }
    return {
      partnerId,
      partnerName,
      partnerImg: null,
      lastMessage: last?.text || "",
      unreadCount: 0,
    };
  });
  setItems(list);
} else {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/chats/recent/${currentUser._id}`
          );

          const list = (res.data || []).map((chat) => ({
            partnerId: chat.partnerId || chat.partner?._id,
            partnerName:
              typeof chat.partnerName === "string"
                ? chat.partnerName
                : chat.partner?.name || "Unknown",
            partnerImg:
              typeof chat.partnerImg === "string"
                ? chat.partnerImg
                : chat.partner?.images?.[0] ||
                  "https://img.freepik.com/premium-vector/social-media-logo_1305298-29989.jpg",
            lastMessage: chat.lastMessage
              ? String(chat.lastMessage.text || chat.lastMessage)
              : "",
            unreadCount: chat.unreadCount || 0,
          }));

          setItems(list);
        } catch (err) {
          console.warn("Failed to load recent chats", err);
          setItems([]);
        }
      }
    };

    load();

    const handler = (msg) => {
      if (!msg) return;
      if (msg.receiver === currentUser._id || msg.sender === currentUser._id) {
        setTimeout(() => load(), 200);
      }
    };
    socket.on("receive-message", handler);
    socket.on("send-message", handler);

    return () => {
      socket.off("receive-message", handler);
      socket.off("send-message", handler);
    };
  }, [currentUser._id, reload]);

  if (items.length === 0)
    return (
      <div className="no-chats">
        <p>No recent chats</p>
      </div>
    );

  return (
    <div className="chat-list">
      {items.map((it) => {
        return (
          <button
            key={it.partnerId}
            className={`chat-item ${selectedId === it.partnerId ? "active" : ""}`}
            onClick={() => onSelect(it)}
          >
            <img
              src={
                it.partnerImg ||
                "https://img.freepik.com/premium-vector/social-media-logo_1305298-29989.jpg"
              }
              alt={it.partnerName}
              className="chat-avatar"
            />
            <div className="chat-info">
              <div className="chat-header">
                <strong className="chat-name">{it.partnerName}</strong>
                {it.unreadCount > 0 && (
                  <span className="chat-badge">{it.unreadCount}</span>
                )}
              </div>
              <div className="chat-last">{(it.lastMessage || "").slice(0, 40)}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
