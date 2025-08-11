// backend/controllers/messageController.js (ESM)
import Message from '../models/Message.js';

export const getMessages = async (req, res) => {
  try {
    const { userId1, userId2 } = req.params; // route: /api/messages/:userId1/:userId2

    const messages = await Message.find({
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 },
      ],
    }).sort({ time: 1 });

    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Error fetching messages" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    console.log("Incoming message data:", req.body);

    const sender = req.body.sender;
    const receiver = req.body.receiver;
    const text = req.body.text;
    const timestamp = req.body.timestamp ? new Date(req.body.timestamp) : new Date();

    // determine if sender looks like a guest (convention: startsWith 'guest_')
    const senderIsGuest = typeof sender === 'string' && sender.startsWith('guest_');

    const message = new Message({
      sender,
      receiver,
      text,
      time: timestamp,
      senderIsGuest,
    });
    console.log("Saving message to DB:", message);
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    console.error("Send message error:", err);
    res.status(500).json({ error: "Message failed" });
  }
};
