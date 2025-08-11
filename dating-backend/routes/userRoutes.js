import express from 'express';
import { discoverUsers, likeUser } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

import User from "../models/User.js";

const router = express.Router();

router.get('/discover', protect, discoverUsers);
router.post('/like/:userId', protect, likeUser);  // ✅ Keep only this for like
router.get("/liked", protect);
router.delete('/unmatch/:userId', protect);
router.post('/add-sample-users', async (req, res) => {
  try {
    const sampleUsers = req.body;
    const createdUsers = await User.insertMany(sampleUsers);
    res.status(201).json(createdUsers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add users', error });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user", error });
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
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password field
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

export default router;
