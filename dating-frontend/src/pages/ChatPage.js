import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatBox from '../components/Chatbox';

const ChatPage = () => {
  const { receiverId } = useParams(); // Get receiverId from URL
  const [receiver, setReceiver] = useState(null);



  useEffect(() => {
    const fetchReceiver = async () => {

      try {
        const res = await fetch(`http://localhost:5000/api/users/${receiverId}`);
        const data = await res.json();
        setReceiver(data);
      } catch (error) {
        console.error("❌ Failed to fetch receiver:", error);
      }
    };

    if (receiverId) {
      fetchReceiver();
    } else {
      console.warn("⚠️ receiverId is undefined, skipping fetch.");
    }
  }, [receiverId]);

  if (!receiver) {
    return <p className="text-center mt-5">Loading chat...</p>;
  }

  return (
    <div className="container py-4">
      <h3 className="text-center mb-3">Chatting with {receiver.name}</h3>
      <ChatBox receiver={receiver} />
    </div>
  );
};

export default ChatPage;
