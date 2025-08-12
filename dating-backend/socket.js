// backend/sockets/socketHandler.js
import Message from '../models/Message.js';

export default function socketHandler(io) {
  const onlineUsers = new Map(); // userId -> socket.id

  io.on('connection', (socket) => {
    console.log('🔌 Socket connected:', socket.id);

    socket.on('user-connected', (userId) => {
      if (!userId) return;
      onlineUsers.set(userId, socket.id);
      console.log('✅ user-connected:', userId, '->', socket.id);
    });

    // msg shape: { sender, receiver, text, timestamp? }
    socket.on('send-message', async (msg) => {
      try {
        if (!msg || !msg.receiver || !msg.text) {
          console.warn('Invalid message payload from socket', msg);
          return;
        }

        const sender = msg.sender || 'unknown';
        const receiver = msg.receiver;
        const text = msg.text;
        const time = msg.timestamp ? new Date(msg.timestamp) : new Date();
        const senderIsGuest = typeof sender === 'string' && sender.startsWith('guest_');

        // If sender is guest => SKIP DB save
        if (!senderIsGuest) {
          // Save message to DB for real users
          const messageDoc = new Message({
            sender,
            receiver,
            text,
            time,
            senderIsGuest: false,
            read: false,
          });

          try {
            await messageDoc.save();
            // optionally replace msg._id/time with DB document
            msg._id = messageDoc._id;
            msg.time = messageDoc.time;
          } catch (saveErr) {
            console.error('DB save error (socket):', saveErr);
            // continue — we still want to attempt emit
          }
        } else {
          // guest message - no DB save, but keep the time in msg
          msg.time = time;
          msg.senderIsGuest = true;
        }

        // Emit to receiver if online
        const receiverSocketId = onlineUsers.get(receiver);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('receive-message', {
            sender,
            receiver,
            text,
            time: msg.time || time,
            senderIsGuest,
            _id: msg._id || null,
          });
        }

        // Optionally ack back to sender if needed
        // socket.emit('message-sent', { ok: true, saved: !senderIsGuest });
      } catch (err) {
        console.error('Error in socket send-message handler:', err);
      }
    });

    socket.on('disconnect', () => {
      // remove socket entry from map
      for (const [userId, sId] of onlineUsers.entries()) {
        if (sId === socket.id) {
          onlineUsers.delete(userId);
          console.log('❌ user disconnected:', userId);
          break;
        }
      }
      console.log('Socket disconnected:', socket.id);
    });
  });
}
