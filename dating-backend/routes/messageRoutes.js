// backend/routes/messages.js
import express from 'express';
import { getMessages, sendMessage } from '../controllers/messageController.js';

const router = express.Router();

// GET messages between two users
// GET /api/messages/:userId1/:userId2
router.get('/:userId1/:userId2', getMessages);

// POST new message
// POST /api/messages   body: { sender, receiver, text, timestamp? }
router.post('/', sendMessage);

export default router;
