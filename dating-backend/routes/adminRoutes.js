import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { checkAdmin } from '../middlewares/adminMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/users', protect, checkAdmin, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

router.delete('/users/:id', protect, checkAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

export default router;
