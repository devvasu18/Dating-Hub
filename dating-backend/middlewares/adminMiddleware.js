import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const checkAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user && user.isAdmin) return next();
    res.status(403).json({ message: 'Admins only' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
