import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Report or block a user
router.post("/report/:id", async (req, res) => {
  const reporterId = req.body.userId;
  const reportedId = req.params.id;

  try {
    const reporter = await User.findById(reporterId);
    const reported = await User.findById(reportedId);

    if (!reporter || !reported) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!reporter.blockedUsers) reporter.blockedUsers = [];
    if (!reporter.reportedUsers) reporter.reportedUsers = [];

    // Avoid duplicate blocks/reports
    if (!reporter.blockedUsers.includes(reportedId)) {
      reporter.blockedUsers.push(reportedId);
    }

    if (!reporter.reportedUsers.includes(reportedId)) {
      reporter.reportedUsers.push(reportedId);
    }

    await reporter.save();

    res.status(200).json({ message: "User reported and blocked" });
  } catch (err) {
    console.error("Error in reporting user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
