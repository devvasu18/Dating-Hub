// routes/messages.js (ESM version)
import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

// ✅ Save a new message
router.post("/", async (req, res) => {
  try {
    const { senderId, receiverId, text } = req.body;

    const newMessage = new Message({ senderId, receiverId, text });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(500).json({ error: "Failed to save message" });
  }
});

// ✅ Get messages between 2 users
router.get("/:userId/:otherUserId", async (req, res) => {
  const { userId, otherUserId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId }
      ]
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;

