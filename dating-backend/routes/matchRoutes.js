import express from 'express';
import User from '../models/User.js';
import Message from '../models/Message.js';

const router = express.Router();

// Pass `io` and `onlineUsers` from app.js
export default (io, onlineUsers) => {
  // Like a user
  router.post("/like/:id", async (req, res) => {
    const likerId = req.body.userId;     // who is liking
    const likedId = req.params.id;       // who is being liked

    const liker = await User.findById(likerId);
    const liked = await User.findById(likedId);

    if (!liker || !liked) return res.status(404).json({ message: "User not found" });

    // Avoid duplicate likes
    if (liker.likes.includes(likedId)) {
      return res.status(400).json({ message: "Already liked" });
    }

    liker.likes.push(likedId);

    let matched = false;

    // If the other user already liked you → it's a match!
    if (liked.likes.includes(likerId)) {
      liker.matches.push(likedId);
      liked.matches.push(likerId);
      matched = true;

      // 🔔 Real-time match notifications
      const likerSocket = onlineUsers.get(likerId.toString());
      const likedSocket = onlineUsers.get(likedId.toString());

      if (likerSocket) {
        io.to(likerSocket).emit("match-notify", {
          userId: likedId,
          message: `You matched with ${liked.name}!`,
        });
      }

      if (likedSocket) {
        io.to(likedSocket).emit("match-notify", {
          userId: likerId,
          message: `You matched with ${liker.name}!`,
        });
      }

      // 📨 Auto welcome messages
      await Message.create({
        sender: likerId,
        receiver: likedId,
        message: `Hi ${liked.name}, we matched! 💬`,
      });

      await Message.create({
        sender: likedId,
        receiver: likerId,
        message: `Hey ${liker.name}, great to match with you too! 😊`,
      });
    }

    await liker.save();
    await liked.save();

    res.status(200).json({ message: "Like processed", matched });
  });

  // Pass a user
  router.post("/pass/:id", async (req, res) => {
    const userId = req.body.userId;
    const passId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.passes.includes(passId)) {
      return res.status(400).json({ message: "Already passed" });
    }

    user.passes.push(passId);
    await user.save();

    res.status(200).json({ message: "User passed" });
  });

  // Get matched users
  router.get("/list/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).populate("matches", "name age gender bio images");

      if (!user) return res.status(404).json({ message: "User not found" });

      res.json({
        matchedUsers: user.matches,
      });
    } catch (err) {
      console.error("Error fetching matches:", err);
      res.status(500).json({ message: "Server error" });
    }
  });

  return router;
};
