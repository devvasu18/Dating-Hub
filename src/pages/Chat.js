import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import "./Chat.css"; // We'll add some basic custom CSS for layout

const matchedUsers = [
  { id: 1, name: "Priya", image: "https://randomuser.me/api/portraits/women/68.jpg" },
  { id: 2, name: "Rahul", image: "https://randomuser.me/api/portraits/men/75.jpg" },
  { id: 3, name: "Simran", image: "https://randomuser.me/api/portraits/women/65.jpg" },
];

function Chat() {
  const [selectedUser, setSelectedUser] = useState(matchedUsers[0]);
  const [messages, setMessages] = useState([
    { text: "Hey there! 👋", sender: "them" },
    { text: "Hi! How are you?", sender: "me" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: "me" }]);
      setNewMessage("");
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row chat-wrapper" style={{ height: "75vh", border: "1px solid #ccc" }}>
        
        {/* Sidebar */}
        <div className="col-md-3 bg-light border-end">
          <h5 className="text-center py-3">Matches</h5>
          {matchedUsers.map((user) => (
            <div
              key={user.id}
              className={`d-flex align-items-center p-2 match-item ${selectedUser.id === user.id ? 'bg-secondary text-white' : ''}`}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedUser(user)}
            >
              <img src={user.image} alt={user.name} className="rounded-circle me-2" width="40" height="40" />
              <span>{user.name}</span>
            </div>
          ))}
        </div>

        {/* Chat Window */}
        <div className="col-md-9 d-flex flex-column">
          <div className="p-3 border-bottom bg-white">
            <h5>Chat with {selectedUser.name}</h5>
          </div>

          {/* Messages */}
          <div className="flex-grow-1 overflow-auto p-3" style={{ background: "#f8f9fa" }}>
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.sender === "me" ? "text-end" : "text-start"}`}>
                <span className={`p-2 rounded ${msg.sender === "me" ? "bg-primary text-white" : "bg-secondary text-white"}`}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={sendMessage} className="p-3 border-top bg-white d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className="btn btn-success" type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
