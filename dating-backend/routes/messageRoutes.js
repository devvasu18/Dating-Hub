import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

// Save a new message
router.post("/", async (req, res) => {
  const { sender, receiver, message } = req.body;
  try {
    const msg = new Message({ sender, receiver, message });
    await msg.save();
    res.status(201).json(msg);
  } catch (err) {
    res.status(500).json({ error: "Failed to save message" });
  }
});

// Get chat history between two users
router.get("/history/:user1/:user2", async (req, res) => {
  const { user1, user2 } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 }
      ]
    }).sort({ createdAt: 1 }); // oldest to newest

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching chat history" });
  }
});

export default router;
