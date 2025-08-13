import Message from "../models/Message.js";
import User from "../models/User.js";
import mongoose from "mongoose";

/**
 * GET /api/chats/recent/:userId
 * Returns list of recent conversation partners for userId
 * Each item: { partnerId, partner (user doc or minimal), lastMessage, unreadCount }
 */
export const getRecentChats = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: "Missing userId" });

    const pipeline = [
      {
        $match: {
          $or: [{ sender: userId }, { receiver: userId }],
        },
      },
      {
        $project: {
          sender: 1,
          receiver: 1,
          text: 1,
          timestamp: 1,
          read: 1,
          partner: {
            $cond: [{ $eq: ["$sender", userId] }, "$receiver", "$sender"],
          },
        },
      },
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: "$partner",
          lastMessage: { $first: "$$ROOT" },
          unreadCount: {
            $sum: {
              $cond: [
                { $and: [{ $eq: ["$receiver", userId] }, { $eq: ["$read", false] }] },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $project: {
          partnerId: "$_id",
          lastMessage: {
            text: "$lastMessage.text",
            timestamp: "$lastMessage.timestamp",
            sender: "$lastMessage.sender",
            receiver: "$lastMessage.receiver",
          },
          unreadCount: 1,
        },
      },
      { $sort: { "lastMessage.timestamp": -1 } },
    ];

    const results = await Message.aggregate(pipeline).allowDiskUse(true);

    // Get partner user info
    const partnerIds = results
      .map((r) => r.partnerId)
      .filter((id) => mongoose.Types.ObjectId.isValid(id));
    const users = await User.find({ _id: { $in: partnerIds } }).select("_id name images");
    const usersMap = new Map();
    users.forEach((u) => usersMap.set(u._id.toString(), u));

    const final = results.map((r) => {
      const pid = r.partnerId;
      const partner = usersMap.get(pid) || { _id: pid, name: "Guest User", images: [] };
      return {
        partnerId: pid,
        partner,
        lastMessage: r.lastMessage,
        unreadCount: r.unreadCount,
      };
    });

    res.json(final);
  } catch (err) {
    console.error("Error getting recent chats:", err);
    res.status(500).json({ error: "Error getting recent chats" });
  }
};

/**
 * POST /api/messages/mark-read
 * Body: { userId, partnerId }
 * Marks messages where sender=partnerId AND receiver=userId as read
 */
export const markRead = async (req, res) => {
  try {
    const { userId, partnerId } = req.body;
    if (!userId || !partnerId) {
      return res.status(400).json({ error: "Missing userId or partnerId" });
    }
    await Message.updateMany(
      { sender: partnerId, receiver: userId, read: { $ne: true } },
      { $set: { read: true } }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to mark messages as read" });
  }
};