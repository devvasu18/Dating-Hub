import express from 'express';
import { discoverUsers, likeUser } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { getLikedUsers } from "../controllers/userController.js";
import { unmatchUser } from "../controllers/userController.js";
import User from "../models/User.js";

const router = express.Router();

router.get('/discover', protect, discoverUsers);
router.post('/like/:userId', protect, likeUser);  // ✅ Keep only this for like
router.get("/liked", protect, getLikedUsers);
router.delete('/unmatch/:userId', protect, unmatchUser);
router.post('/add-sample-users', async (req, res) => {
  try {
    const sampleUsers = req.body;
    const createdUsers = await User.insertMany(sampleUsers);
    res.status(201).json(createdUsers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add users', error });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default router;
