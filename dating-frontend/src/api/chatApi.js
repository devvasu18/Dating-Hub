import axios from "axios";

export const sendMessageToServer = async (msg) => {
  const res = await axios.post("http://localhost:5000/api/messages", msg);
  return res.data;
};

export const fetchMessagesFromServer = async (senderId, receiverId) => {
  const res = await axios.get(
    `http://localhost:5000/api/messages/${senderId}/${receiverId}`
  );
  return res.data;
};
