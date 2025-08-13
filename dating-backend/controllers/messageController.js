// backend/controllers/messageController.js (ESM)
import mongoose from "mongoose";
import Message from "../models/Message.js";
import User from "../models/User.js"; // adjust path if needed

export const getMessages = async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;
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
    const { sender, receiver, text, timestamp } = req.body;
    const time = timestamp ? new Date(timestamp) : new Date();
    const senderIsGuest = typeof sender === "string" && sender.startsWith("guest_");

    const message = new Message({
      sender,
      receiver,
      text,
      time,
      senderIsGuest,
      read: false,
    });

    await message.save();
    res.status(201).json(message);
  } catch (err) {
    console.error("Send message error:", err);
    res.status(500).json({ error: "Message failed" });
  }
};

// mark messages from partner -> user as read
export const markRead = async (req, res) => {
  try {
    const { userId, partnerId } = req.body;
    if (!userId || !partnerId) return res.status(400).json({ error: "Missing params" });

    // mark messages that receiver is the user and sender is partner (i.e. partner sent)
    const result = await Message.updateMany(
      { sender: partnerId, receiver: userId, read: false },
      { $set: { read: true } }
    );

    // optionally, notify partner via socket: see socket handler (optional)
    res.json({ success: true, modifiedCount: result.modifiedCount });
  } catch (err) {
    console.error("markRead error:", err);
    res.status(500).json({ error: "markRead failed" });
  }
};

// get recent chats for a user with lastMessage and unreadCount
export const getRecentChats = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: "Missing userId" });

    // Aggregate messages where user is either sender or receiver
    const pipeline = [
      {
        $match: {
          $or: [{ sender: userId }, { receiver: userId }]
        }
      },
      {
        $project: {
          sender: 1,
          receiver: 1,
          text: 1,
          time: 1,
          read: 1,
          senderIsGuest: 1,
          partner: { $cond: [{ $eq: ["$sender", userId] }, "$receiver", "$sender"] }
        }
      },
      { $sort: { time: -1 } },
      {
        $group: {
          _id: "$partner",
          lastMessage: { $first: "$$ROOT" },
          unreadCount: {
            $sum: {
              $cond: [
                { $and: [{ $eq: ["$receiver", userId] }, { $eq: ["$read", false] }] },
                1,
                0
              ]
            }
          }
        }
      },
      {
        $project: {
          partnerId: "$_id",
          lastMessage: {
            text: "$lastMessage.text",
            time: "$lastMessage.time",
            sender: "$lastMessage.sender",
            receiver: "$lastMessage.receiver",
            senderIsGuest: "$lastMessage.senderIsGuest"
          },
          unreadCount: 1
        }
      },
      { $sort: { "lastMessage.time": -1 } }
    ];

    const results = await Message.aggregate(pipeline).allowDiskUse(true);

    // prepare partner info for each partnerId — but partnerId may be a guest id (not ObjectId)
    const partnerIds = results.map(r => r.partnerId).filter(Boolean);

    // split into valid ObjectId strings and guest strings
    const validObjectIds = partnerIds.filter(id => mongoose.isValidObjectId(id));
    const userDocs = validObjectIds.length > 0
      ? await User.find({ _id: { $in: validObjectIds } }).select("_id name images")
      : [];

    const usersMap = new Map();
    userDocs.forEach(u => usersMap.set(String(u._id), u));

    const final = results.map(r => {
      const pid = r.partnerId;
      const partner = usersMap.get(String(pid)) || { _id: pid, name: (String(pid).startsWith("guest_") ? "Guest" : "Unknown"), images: [] };
      return {
        partnerId: pid,
        partner,
        lastMessage: r.lastMessage,
        unreadCount: r.unreadCount || 0
      };
    });

    res.json(final);
  } catch (err) {
    console.error("Error getting recent chats:", err);
    res.status(500).json({ error: "Error getting recent chats" });
  }
};
