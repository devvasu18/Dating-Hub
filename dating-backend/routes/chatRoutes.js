// backend/routes/chats.js
import express from 'express';
import { getRecentChats, markRead } from '../controllers/chatController.js';

const router = express.Router();

// GET /api/chats/recent/:userId
router.get('/recent/:userId', getRecentChats);

// POST /api/messages/mark-read
router.post('/recent/mark-read', markRead);

export default router;
