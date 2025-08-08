import express from 'express';
import { getMessages, sendMessage } from '../controllers/messageController.js';

const router = express.Router();

router.get('/:userId1/:userId2', getMessages);
router.post('/', sendMessage);

export default router;


