// backend/controllers/messageController.js
import Message from '../models/Message.js';

export const getMessages = async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;
    if (!userId1 || !userId2) return res.status(400).json({ error: 'Missing user IDs' });

    const messages = await Message.find({
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 },
      ],
    }).sort({ time: 1 });

    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: 'Error fetching messages' });
  }
};

/**
 * POST /api/messages
 * Body: { sender, receiver, text, timestamp? }
 * If sender looks like guest (string starting with 'guest_') => do NOT persist in DB.
 * Still responds with the message shape so frontend can show it and still emits via socket elsewhere.
 */
export const sendMessage = async (req, res) => {
  try {
    const { sender, receiver, text, timestamp } = req.body;
    if (!receiver || !text) return res.status(400).json({ error: 'receiver and text required' });

    const msgTime = timestamp ? new Date(timestamp) : new Date();
    const senderIsGuest = typeof sender === 'string' && sender.startsWith('guest_');

    // Create message object shape for response / socket
    const responseMsg = {
      sender: sender || 'unknown',
      receiver,
      text,
      time: msgTime,
      senderIsGuest,
    };

    if (senderIsGuest) {
      // SKIP DB save for guest messages
      // Return success but indicate not saved
      return res.status(200).json({ ok: true, saved: false, message: responseMsg });
    }

    // Save for real users
    const messageDoc = new Message({
      sender,
      receiver,
      text,
      time: msgTime,
      senderIsGuest: false,
      read: false,
    });

    await messageDoc.save();
    return res.status(201).json({ ok: true, saved: true, message: messageDoc });
  } catch (err) {
    console.error('Send message error:', err);
    res.status(500).json({ error: 'Message failed' });
  }
};
